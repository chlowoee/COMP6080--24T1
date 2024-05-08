import { getComments, createComment, createCommentElement } from "./comment.js";
import { displayErrorModal } from "./error.js";
import {
  postPutApiCall,
  goToPage,
  clearChildren,
  delApiCall,
  getApiCall,
  makeLikeButton,
  makeDislikeButton,
  makeUnwatchButton,
  makeWatchButton,
  makeEditButton,
  makeDeleteButton,
  createElement,
} from "./helpers.js";
import { getUser, showUserProfile } from "./user.js";

export const createNewThread = () => {
  const body = {
    title: document.getElementById("new-thread-title").value,
    isPublic: document.getElementById("new-thread-public").checked,
    content: document.getElementById("new-thread-content").value,
  };

  postPutApiCall("thread", "POST", body, "Thread Creation Error", (data) => {
    localStorage.setItem("threadId", data.id);

    //load dashboard and threads
    goToPage("dashboard");
    loadThreads(0);
    showIndividualThreadScreen(data.id);
  });
};
export const getThread = (threadId) => {
  return new Promise((resolve) => {
    getApiCall("thread", "Thread Error", "id=" + threadId, (data) => {
      resolve(data);
    });
  });
};
// Loads threads onto page. Source: Week 5 lec
// Promise source: https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
export const loadThreads = (start) => {
  let threads = Promise.resolve(getThreads(start));
  threads.then((data) => {
    clearChildren(document.getElementById("threads"));
    const container = createElement(
      "div",
      "",
      ["d-flex", "flex-row", "justify-content-between"],
      document.getElementById("threads")
    );
    const title = createElement("h2", null, null, container);
    let threads = Promise.resolve(getThreads(start + 5));
    threads.then((data) => {
      if (data > 0) {
        const more = createElement(
          "button",
          "more-button",
          ["btn", "btn-primary", "m-2", "primary-colour"],
          container
        );
        more.innerText = "More";
        // view more threads
        document.getElementById("more-button").addEventListener("click", () => {
          start = start + 5;
          let threads = Promise.resolve(getThreads(start));
          threads.then((data) => {
            // moved this into else
            loadThreads(start);
            goToPage("dashboard");
          });
        });
      }
    });

    if (data.length === 0) {
      title.innerText = "Welcome to QandA!";
    } else {
      title.innerText = "Threads";
      Promise.all(data.map((id) => getThread(id)))
        .then((data) => {
          data.sort(function (a, b) {
            //sort based on time
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          data.forEach((item) => {
            showThreadDetail(item);
          });
        })
        .catch((error) => displayErrorModal("Thread error", error.message));
    }
  });
};

export const showThreadDetail = (data) => {
  // Create list group item representing a thread
  const listItem = document.createElement("button");
  listItem.classList.add(
    "list-group-item",
    "list-group-item-action",
    "flex-row",
    "p-4"
  );

  listItem.style.maxHeight = "100px";

  // create container that holds title + author
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("d-flex", "justify-content-between");

  // Title
  const title = document.createElement("h6");
  title.classList.add("mb-1");

  // truncates the title if too long
  let tempTitle = data.title;
  if (tempTitle.length > 21) {
    tempTitle = tempTitle.substring(0, 20) + "...";
  }
  title.innerText = tempTitle;
  leftContainer.appendChild(title);

  // author
  const author = document.createElement("p");
  author.classList.add("mb-1");
  let user = Promise.resolve(getUser(data.creatorId));
  user.then((data) => {
    author.innerText = data.name;
  });
  leftContainer.appendChild(author);

  // Container for date, time, and likes
  const dateTimeLikesContainer = document.createElement("div");
  dateTimeLikesContainer.classList.add("d-flex", "justify-content-between");

  const dateTimeContainer = document.createElement("div");
  dateTimeContainer.classList.add("d-flex", "flex-column");

  // Post time
  const postTime = document.createElement("small");
  postTime.classList.add("text-muted");
  const timeOptions = { hour: "numeric", minute: "numeric" };
  postTime.innerText = new Date(data.createdAt).toLocaleTimeString(
    undefined,
    timeOptions
  );
  dateTimeContainer.appendChild(postTime);

  // Post date
  const postDate = document.createElement("small");
  postDate.classList.add("text-muted");
  postDate.innerText = new Date(data.createdAt).toLocaleDateString();
  dateTimeContainer.appendChild(postDate);
  // Number of likes
  const likesContainer = createElement(
    "div",
    "",
    ["d-flex", "flex-row"],
    dateTimeLikesContainer
  );
  const likes = createElement("p", "", ["text-muted", "m-1"], likesContainer);
  likes.innerText = data.likes.length;
  likes.setAttribute("id", "thread-detail-likes-" + data.id);
  const likesTitle = createElement(
    "p",
    "",
    ["text-muted", "m-1"],
    likesContainer
  );
  likesTitle.innerText = " like(s)";

  document.getElementById("threads").appendChild(listItem);

  dateTimeLikesContainer.appendChild(dateTimeContainer);
  dateTimeLikesContainer.appendChild(likesContainer);

  listItem.appendChild(leftContainer);
  listItem.appendChild(dateTimeLikesContainer);

  // add event listener for opening individual thread screen
  listItem.addEventListener("click", () => {
    showIndividualThreadScreen(data.id);
  });
};

export const showIndividualThreadScreen = (threadId) => {
  clearChildren(document.getElementById("indiv-thread-screen"));
  localStorage.setItem("threadId", threadId);

  getApiCall("thread", "Thread Error", "id=" + threadId, (data) => {
    if (data.error) {
      displayErrorModal("Thread error", data.error);
    } else {
      // Create thread contents
      const threadContentsDiv = createElement(
        "div",
        "thread-contents",
        null,
        document.getElementById("indiv-thread-screen")
      );
      showThreadContents(data, threadContentsDiv);

      // Create thread buttons div
      createElement(
        "div",
        "thread-buttons",
        null,
        document.getElementById("indiv-thread-screen")
      );

      // get thread details:
      let thread = Promise.resolve(getThread(threadId));
      thread.then((data) => {
        // like button
        if (data.likes.includes(parseInt(localStorage.getItem("userId")))) {
          makeDislikeButton(
            threadId,
            document.getElementById("thread-buttons")
          );
        } else {
          makeLikeButton(threadId, document.getElementById("thread-buttons"));
        }
        // watch button
        if (data.watchees.includes(parseInt(localStorage.getItem("userId")))) {
          makeUnwatchButton(
            threadId,
            document.getElementById("thread-buttons")
          );
        } else {
          makeWatchButton(threadId, document.getElementById("thread-buttons"));
        }
        if (data.creatorId === parseInt(localStorage.getItem("userId"))) {
          makeEditButton(threadId);
          makeDeleteButton(threadId);
        }
      });

      createElement(
        "div",
        "comments-container",
        null,
        document.getElementById("indiv-thread-screen")
      );

      let comments = Promise.resolve(getComments(threadId));
      comments.then((data) => {
        if (data.length === 0) {
          createCommentTextBox(threadId);
        } else {
          showThreadComments(
            threadId,
            document.getElementById("comments-container"),
            data
          );
          createCommentTextBox(threadId);
        }
      });
    }
  });
};

export const editThread = (pageNumber) => {
  // call apihelper function
  const body = {
    id: localStorage.getItem("threadId"),
    title: document.getElementById("edit-thread-title").value,
    isPublic: document.getElementById("edit-thread-public").checked,
    lock: document.getElementById("edit-thread-lock").checked,
    content: document.getElementById("edit-thread-content").value,
  };

  const fetchObj = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (localStorage.getItem("token"))
    fetchObj.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  fetch("http://localhost:5005/thread", fetchObj)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        displayErrorModal("Edit Thread Error", data.error);
      } else {
        showIndividualThreadScreen(localStorage.getItem("threadId"));
        loadThreads(pageNumber);
        goToPage("dashboard");
      }
    });
};

export const getThreads = (start) => {
  return new Promise((resolve) => {
    getApiCall("threads", "Thread Error", "start=" + start, (data) => {
      resolve(data);
    });
  });
};

export const deleteThread = (threadId) => {
  const body = {
    id: threadId,
  };

  delApiCall("thread", body, "Thread Deletion Error", () => {
    localStorage.removeItem("threadId");
    //load dashboard and threads
    goToPage("dashboard");
    let threads = Promise.resolve(getThreads(0));
    threads.then((data) => {
      loadThreads(0);
      if (data.length === 0) {
        clearChildren(document.getElementById("indiv-thread-screen"));
      } else {
        showIndividualThreadScreen(data[0]);
      }
    });
  });
};

export const dislikeThread = (threadId) => {
  const body = {
    id: threadId,
    turnon: false,
  };
  postPutApiCall("thread/like", "PUT", body, "Liking Thread Error", () => {});
};

export const likeThread = (threadId) => {
  const body = {
    id: threadId,
    turnon: true,
  };
  postPutApiCall("thread/like", "PUT", body, "Liking Thread Error", () => {});
};

export const watchThread = (threadId) => {
  const body = {
    id: threadId,
    turnon: true,
  };
  postPutApiCall(
    "thread/watch",
    "PUT",
    body,
    "Watching Thread Error",
    () => {}
  );
};

export const unwatchThread = (threadId) => {
  const body = {
    id: threadId,
    turnon: false,
  };
  postPutApiCall(
    "thread/watch",
    "PUT",
    body,
    "Watching Thread Error",
    () => {}
  );
};

export const createAuthorLink = (appendToElement, data) => {
  const threadAuthor = createElement(
    "a",
    "thread-author",
    [
      "user",
      "m-2",
      "link-offset-2",
      "link-offset-3-hover",
      "link-underline",
      "link-underline-opacity-0",
      "link-underline-opacity-75-hover",
      "link-secondary",
    ],
    appendToElement
  );
  threadAuthor.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default behavior of anchor tag
    let user = Promise.resolve(getUser(data.creatorId));
    user.then((data) => {
      showUserProfile(data);
    });
  });

  let user = Promise.resolve(getUser(data.creatorId));
  user.then((data) => {
    threadAuthor.innerText = data.name;
  });
};

export const showThreadContents = (data, appendToElement) => {
  const threadTitle = createElement(
    "h2",
    "thread-title",
    ["mt-3", "mb-3", "ml-1"],
    appendToElement
  );
  threadTitle.innerText = data.title;
  const iconContentContainer = createElement(
    "div",
    null,
    ["d-flex", "flex-row", "margin-2"],
    appendToElement
  );

  ((data) => {
    let user = Promise.resolve(getUser(data.creatorId));
    user.then((userDetails) => {
      const profilePicture = createElement(
        "img",
        null,
        ["profile-picture"],
        iconContentContainer
      );

      if (userDetails.image) {
        profilePicture.src = userDetails.image;
      } else {
        profilePicture.src = "assets/user.png";
      }
      // profile picture
      profilePicture.setAttribute("alt", "PFP");
      const contentContainer = createElement(
        "div",
        null,
        ["d-flex", "flex-column", "margin-2"],
        iconContentContainer
      );

      createAuthorLink(contentContainer, data);
      const threadContentDiv = createElement(
        "div",
        null,
        ["margin-2"],
        contentContainer
      );
      const threadContent = createElement(
        "p",
        "thread-content",
        ["margin-2"],
        threadContentDiv
      );
      threadContent.innerText = data.content;

      const likesContainer = createElement(
        "div",
        "",
        ["d-flex", "flex-row"],
        contentContainer
      );
      const likes = createElement(
        "p",
        "",
        ["text-muted", "m-1"],
        likesContainer
      );
      likes.innerText = data.likes.length;
      likes.setAttribute("id", "thread-likes-" + data.id);
      const likesTitle = createElement(
        "p",
        "",
        ["text-muted", "m-1"],
        likesContainer
      );
      likesTitle.innerText = " like(s)";

      const watchContainer = createElement(
        "div",
        "",
        ["d-flex", "flex-row"],
        contentContainer
      );
      const watch = createElement(
        "p",
        "",
        ["text-muted", "m-1"],
        watchContainer
      );
      watch.innerText = data.watchees.length;
      watch.setAttribute("id", "thread-watchees-" + data.id);

      const watchTitle = createElement(
        "p",
        "",
        ["text-muted", "m-1"],
        watchContainer
      );
      watchTitle.innerText = " watchees(s)";
    });
  })(data);
};

export const showThreadComments = (threadId, appendToElement, data) => {
  let type;
  if (appendToElement !== document.getElementById("comments-container")) {
    type = "h6";
  } else {
    type = "h2";
  }
  const commentsTitle = createElement(type, null, null, appendToElement);
  commentsTitle.innerText = "Comments";
  const parentComments = [];
  const childComments = [];

  data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  // Iterate through sorted comments and categorize them as parent or child
  data.forEach((comment) => {
    if (comment.parentCommentId === null) {
      parentComments.push(comment);
    } else if (comment.threadId === parseInt(threadId)) {
      childComments.push(comment);
    }
  });

  parentComments.forEach((comment, index) => {
    let previous = index - 1 >= 0 ? index - 1 : null;
    createCommentElement(
      threadId,
      comment,
      parentComments[previous],
      appendToElement
    );
  });

  childComments.forEach((comment) => {
    createCommentElement(threadId, comment, null, null);
  });
};

// creates comment box if thread is not locked.
const createCommentTextBox = (threadId) => {
  let thread = Promise.resolve(getThread(threadId));
  thread.then((data) => {
    if (data.lock) {
      return;
    } else {
      const textBoxDiv = createElement(
        "div",
        "comments-container",
        null,
        document.getElementById("indiv-thread-screen")
      );
      const textBox = createElement(
        "textarea",
        "comment-text-box",
        ["form-control"],
        textBoxDiv
      );
      textBox.setAttribute("rows", "5");
      const commentButton = createElement(
        "button",
        "comment-thread-button",
        ["btn", "btn-primary", "m-2", "primary-colour"],
        textBoxDiv
      );
      commentButton.innerText = "Comment";
      document.getElementById("indiv-thread-screen").appendChild(textBoxDiv);
      commentButton.addEventListener("click", () => {
        createComment(textBox.value, threadId, null);
        textBox.value = "";
        showIndividualThreadScreen(threadId);
      });
    }
  });
};
