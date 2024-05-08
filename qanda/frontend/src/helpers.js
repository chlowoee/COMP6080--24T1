import { displayErrorModal } from "./error.js";
import {
  likeThread,
  dislikeThread,
  getThread,
  watchThread,
  unwatchThread,
  deleteThread,
  getThreads,
  loadThreads,
} from "./thread.js";
const pages = [
  "login-form",
  "register-form",
  "dashboard",
  "create-thread-form",
  "edit-thread-form",
  "user-profile-screen",
];

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl(file) {
  const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error("provided file is not a png, jpg or jpeg image.");
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

// Post request. Source: Qanda spec.
export const postPutApiCall = (path, method, body, errorTitle, success) => {
  const fetchObj = {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (localStorage.getItem("token"))
    fetchObj.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  fetch("http://localhost:5005/" + path, fetchObj)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        displayErrorModal(errorTitle, data.error);
      } else {
        success(data);
      }
    });
};

// Delete request. Source: Qanda spec. (merge this with post later on)
export const delApiCall = (path, body, errorTitle, success) => {
  const fetchObj = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  if (localStorage.getItem("token"))
    fetchObj.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  fetch("http://localhost:5005/" + path, fetchObj)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        displayErrorModal(errorTitle, data.error);
      } else {
        success(data);
      }
    });
};

// Get request. Source: Qanda spec.
export const getApiCall = (path, errorTitle, queryString, success) => {
  fetch("http://localhost:5005/" + path + "?" + queryString, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        let errorMsg;
        if (errorTitle === "Thread Error") {
          errorMsg = "Invalid token, please login or register.";
        } else {
          errorMsg = data.error;
        }
        displayErrorModal(errorTitle, errorMsg);
      } else {
        success(data);
      }
    });
};

// Displays a certain page. Source: Week 5 lecture
export const goToPage = (toPage) => {
  for (const p of pages) {
    document.getElementById(`${p}`).style.display = "none";
  }
  document.getElementById(`${toPage}`).style.display = "block";

  // toggles logout button on the nav bar
  if (toPage === "login-form" || toPage === "register-form") {
    document.getElementById("logged-out-nav").style.display = "block";
    document.getElementById("logged-in-nav").style.display = "none";
  } else {
    document.getElementById("logged-in-nav").style.display = "block";
    document.getElementById("logged-out-nav").style.display = "none";
  }
};

// clears all children of an element
export const clearChildren = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

export const makeLikeButton = (threadId, appendToElement) => {
  const likeButton = svgButton("like", appendToElement);
  likeButton.addEventListener("click", () => {
    // check if the thread is locked
    let thread = Promise.resolve(getThread(threadId));
    thread.then((data) => {
      if (data.lock) {
        displayErrorModal("Locked Thread", "Can't like a locked thread");
      } else {
        document.getElementById("thread-detail-likes-" + threadId).innerText++;
        document.getElementById("thread-likes-" + threadId).innerText++;
        likeThread(threadId);
        clearChildren(document.getElementById("thread-buttons"));
        makeDislikeButton(threadId, appendToElement);

        // let thread = Promise.resolve(getThread(threadId));
        // thread.then((data) => {
        // watch button
        if (data.watchees.includes(parseInt(localStorage.getItem("userId")))) {
          makeUnwatchButton(threadId, appendToElement);
        } else {
          makeWatchButton(threadId, appendToElement);
        }
        if (data.creatorId === parseInt(localStorage.getItem("userId"))) {
          makeEditButton(threadId);
          makeDeleteButton(threadId);
        }
        // })
      }
    });
  });
};

export const svgButton = (type, appendToElement) => {
  const btn = createElement(
    "button",
    "dislike-thread-button",
    ["btn", "btn-primary", "m-2", "primary-colour"],
    appendToElement
  );
  const img = createElement("img", "", "", btn);

  if (type === "dislike") {
    img.setAttribute("src", "assets/heart-fill.svg");
    img.setAttribute("alt", "Like");
  } else if (type === "like") {
    img.setAttribute("src", "assets/heart.svg");
    img.setAttribute("alt", "Dislike");
  } else if (type === "watch") {
    img.setAttribute("src", "assets/eye-fill.svg");
    img.setAttribute("alt", "Watch");
  } else {
    img.setAttribute("src", "assets/eye-slash.svg");
    img.setAttribute("alt", "Unwatch");
  }

  return btn;
};
export const makeDislikeButton = (threadId, appendToElement) => {
  const dislikeButton = svgButton("dislike", appendToElement);
  dislikeButton.addEventListener("click", () => {
    let thread = Promise.resolve(getThread(threadId));
    thread.then((data) => {
      if (data.lock) {
        displayErrorModal("Locked Thread", "Can't dislike a locked thread");
      } else {
        if (
          parseInt(
            document.getElementById("thread-likes-" + threadId).innerText
          ) > 0
        ) {
          document.getElementById("thread-detail-likes-" + threadId)
            .innerText--;
          document.getElementById("thread-likes-" + threadId).innerText--;
        }
        dislikeThread(threadId, appendToElement);
        clearChildren(document.getElementById("thread-buttons"));
        makeLikeButton(threadId, appendToElement);
        let thread = Promise.resolve(getThread(threadId));
        thread.then((data) => {
          // watch button
          if (
            data.watchees.includes(parseInt(localStorage.getItem("userId")))
          ) {
            makeUnwatchButton(threadId, appendToElement);
          } else {
            makeWatchButton(threadId, appendToElement);
          }
          if (data.creatorId === parseInt(localStorage.getItem("userId"))) {
            makeEditButton(threadId, appendToElement);
            makeDeleteButton(threadId, appendToElement);
          }
        });
      }
    });
  });
};

export const makeWatchButton = (threadId, appendToElement) => {
  const watchButton = svgButton("watch", appendToElement);

  watchButton.addEventListener("click", () => {
    document.getElementById("thread-watchees-" + threadId).innerText++;
    watchThread(threadId);
    clearChildren(document.getElementById("thread-buttons"));
    let thread = Promise.resolve(getThread(threadId));
    thread.then((data) => {
      // like button
      if (data.likes.includes(parseInt(localStorage.getItem("userId")))) {
        makeDislikeButton(threadId, appendToElement);
      } else {
        makeLikeButton(threadId, appendToElement);
      }
      makeUnwatchButton(threadId, appendToElement);

      if (data.creatorId === parseInt(localStorage.getItem("userId"))) {
        makeEditButton(threadId);
        makeDeleteButton(threadId);
      }
    });
  });
};

export const makeUnwatchButton = (threadId, appendToElement) => {
  const unwatchButton = svgButton("unwatch", appendToElement);

  unwatchButton.addEventListener("click", () => {
    if (
      parseInt(
        document.getElementById("thread-watchees-" + threadId).innerText
      ) > 0
    ) {
      document.getElementById("thread-watchees-" + threadId).innerText--;
    }
    unwatchThread(threadId);
    clearChildren(document.getElementById("thread-buttons"));
    let thread = Promise.resolve(getThread(threadId));
    thread.then((data) => {
      // like button
      if (data.likes.includes(parseInt(localStorage.getItem("userId")))) {
        makeDislikeButton(threadId, appendToElement);
      } else {
        makeLikeButton(threadId, appendToElement);
      }
      makeWatchButton(threadId, appendToElement);

      if (data.creatorId === parseInt(localStorage.getItem("userId"))) {
        makeEditButton(threadId);
        makeDeleteButton(threadId);
      }
    });
  });
};

export const makeEditButton = (threadId) => {
  const editButton = createElement(
    "button",
    "edit-thread-button",
    ["btn", "btn-primary", "m-2", "primary-colour"],
    document.getElementById("thread-buttons")
  );
  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    // get thread data
    let thread = Promise.resolve(getThread(threadId));
    thread.then((data) => {
      document.getElementById("edit-thread-title").value = data.title;
      document.getElementById("edit-thread-public").checked = data.isPublic;
      document.getElementById("edit-thread-lock").checked = data.lock;
      document.getElementById("edit-thread-content").value = data.content;
      // display form
      goToPage("edit-thread-form");
    });
  });
};

export const makeDeleteButton = (threadId) => {
  const deleteButton = createElement(
    "button",
    "delete-thread-button",
    ["btn", "btn-primary", "m-2", "primary-colour"],
    document.getElementById("thread-buttons")
  );
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", () => {
    deleteThread(threadId);
  });
};

export const getTime = (createdAt) => {
  const currentDate = new Date();
  const timestamp = new Date(createdAt);
  const timeDiff = currentDate - timestamp;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute(s) ago`;
  } else if (hours < 24) {
    return `${hours} hour(s) ago`;
  } else {
    return `${days} day(s) ago`;
  }
};

export const createElement = (type, id, classList, appendToElement) => {
  const element = document.createElement(type);
  if (id) {
    element.setAttribute("id", id);
  }
  if (classList && classList.length > 0) {
    element.classList.add(...classList);
  }
  if (appendToElement) {
    appendToElement.appendChild(element);
  }
  return element;
};

export const makeBackButton = (appendToElement, backToPage) => {
  const backButton = createElement(
    "button",
    "",
    ["btn", "btn-primary", "m-2", "primary-colour", "reply-button"],
    appendToElement
  );
  backButton.innerText = "Back";

  backButton.addEventListener("click", () => {
    goToPage(backToPage);
  });
};

export const getAllThreads = (start, allThreads) => {
  return new Promise((resolve) => {
    let threads = Promise.resolve(getThreads(start));
    threads.then((data) => {
      // loadThreads(0);
      if (data.length > 0) {
        allThreads.push(...data);
        getAllThreads(start + 5, allThreads).then(resolve);
      } else {
        resolve(allThreads);
      }
    });
  });
};

export const clearLogin = () => {
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
};
export const clearReg = () => {
  document.getElementById("register-email").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("register-name").value = "";
  document.getElementById("confirm-password").value = "";
};

export const clearCreate = () => {
  document.getElementById("new-thread-title").value = "";
  document.getElementById("new-thread-public").checked = false;
  document.getElementById("new-thread-content").value = "";
};
