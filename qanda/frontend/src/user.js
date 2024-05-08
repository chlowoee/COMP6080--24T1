import {
  clearChildren,
  getApiCall,
  goToPage,
  postPutApiCall,
  createElement,
  makeBackButton,
  getAllThreads,
  fileToDataUrl,
} from "./helpers.js";

import { getThread, showThreadContents, showThreadComments } from "./thread.js";
import { getComments } from "./comment.js";

export const getUser = (userId) => {
  return new Promise((resolve) => {
    getApiCall("user", "User Error", "userId=" + userId, (data) => {
      resolve(data);
    });
  });
};

export const updateProfile = (email, password, name, image) => {
  const body = {
    email: email,
    password: password,
    name: name,
    image: image,
  };

  postPutApiCall("user", "PUT", body, "Update Profile Error", () => {});
};

export const updateAdmin = (email) => {
  const body = {
    userId: email,
    turnon: true,
  };
  postPutApiCall("user/admin", "PUT", body, "Update Admin Error", () => {});
};

export const updateUser = (email) => {
  const body = {
    userId: email,
    turnon: false,
  };

  postPutApiCall("user/admin", "PUT", body, "Update Admin Error", () => {});
};

export const showUserProfile = (user) => {
  showUserInfo(user);

  //threads
  getUserThreads(user);
  goToPage("user-profile-screen");
};

const showUserInfo = (user) => {
  const userProfileContainer = document.getElementById("user-profile-screen");

  clearChildren(userProfileContainer);
  const container = createElement(
    "div",
    null,
    ["d-flex", "flex-row"],
    userProfileContainer
  );
  // Create and append elements for user information
  const profilePicture = createElement("img", null, null, container);
  profilePicture.setAttribute("width", "50px");
  profilePicture.setAttribute("height", "50px");

  profilePicture.setAttribute("alt", "PFP");
  if (user.image) {
    profilePicture.src = user.image;
  } else {
    profilePicture.src = "assets/user.png";
  }
  const userContent = createElement(
    "div",
    "user-content-container",
    ["d-flex", "flex-column", "w-75"],
    container
  );

  const username = createElement("h2", null, ["m-3"], userContent);
  username.innerText = user.name;

  const email = createElement("p", null, ["m-3"], userContent);
  email.innerText = user.email;

  const isAdmin = createElement("p", null, ["m-3"], userContent);
  isAdmin.innerText = user.admin
    ? "This user is an admin."
    : "This user is not an admin.";

  ((user) => {
    let thread = Promise.resolve(getUser(localStorage.getItem("userId")));
    thread.then((data) => {
      if (data.admin) {
        const inputGroupDiv = createElement(
          "div",
          null,
          ["input-group", "mb-3"],
          userContent
        );

        const prependDiv = createElement(
          "div",
          null,
          ["input-group-prepend"],
          inputGroupDiv
        );

        const button = createElement(
          "button",
          null,
          ["btn", "btn-outline-secondary", "ml-2"],
          prependDiv
        );
        button.textContent = "Select";

        const select = createElement(
          "select",
          "user-admin-select",
          ["custom-select"],
          inputGroupDiv
        );

        const defaultTest = createElement("option", null, null, select);
        defaultTest.selected = true;
        defaultTest.textContent = "Choose...";

        const values = ["User", "Admin"];
        values.forEach((value, index) => {
          const option = createElement("option", null, null, select);
          option.value = index + 1;
          option.textContent = value;
        });

        button.addEventListener("click", () => {
          const select = document.getElementById("user-admin-select");
          select.value === "2" ? updateAdmin(user.id) : updateUser(user.id);
          let updatedUser = Promise.resolve(getUser(user.id));
          updatedUser.then((userInfo) => {
            showUserProfile(userInfo);
          });
        });
      }

      const btnContainer = createElement(
        "div",
        null,
        ["d-flex", "flex-row"],
        userContent
      );
      makeBackButton(btnContainer, "dashboard");
      const editProfileButton = createElement(
        "button",
        "edit-profile-button",
        ["btn", "btn-primary", "m-2", "primary-colour"],
        btnContainer
      );
      editProfileButton.innerText = "Edit Profile";
      editProfileButton.addEventListener("click", () => {
        createUserModal("create-user-modal", "Update details", "Update", user);
      });
      const title = createElement("h2", null, ["mt-3"], userContent);
      title.innerText = "Threads";
    });
  })(user);
};

const getUserThreads = (user) => {
  // get thread details:

  let start = 0;
  let allThreads = [];

  let threads = Promise.resolve(getAllThreads(start, allThreads));
  threads.then((allThreadsList) => {
    Promise.all(allThreadsList.map((id) => getThread(id))).then((data) => {
      data.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      data.forEach((thread) => {});
      let sortedList = data.filter((thread) => thread.creatorId === user.id);
      const threadContentsDiv = createElement(
        "div",
        null,
        null,
        document.getElementById("user-content-container")
      );
      sortedList.forEach((item) => {
        const container = createElement(
          "div",
          null,
          ["border-top", "w-100"],
          threadContentsDiv
        );
        showThreadContents(item, container);
        let comments = Promise.resolve(getComments(item.id));
        comments.then((data) => {
          if (data.length === 0) {
            return;
          } else {
            createElement(
              "div",
              "comments-container-" + item.id,
              null,
              container
            );
            showThreadComments(
              item.id,
              document.getElementById("comments-container-" + item.id),
              data
            );
          }
        });
      });
    });
  });
};

export const createUserModal = (modalId, title, submitString, user) => {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("id", modalId);
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-hidden", "true");

  // Modal dialog
  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  // Modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Modal header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.innerText = title;
  modalHeader.appendChild(modalTitle);

  // modal body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  // body elements:
  const form = document.createElement("form");
  modalBody.appendChild(form);

  // Email input
  const emailInput = document.createElement("input");
  emailInput.classList.add("form-control", "mb-3");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("placeholder", "Email Address");
  form.appendChild(emailInput);

  const passwordInput = document.createElement("input");
  passwordInput.classList.add("form-control", "mb-3");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Password");
  form.appendChild(passwordInput);

  const nameInput = document.createElement("input");
  nameInput.classList.add("form-control", "mb-3");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Name");
  form.appendChild(nameInput);

  const imageInput = document.createElement("input");
  imageInput.classList.add("form-control-file", "mb-3");
  imageInput.setAttribute("type", "file");
  imageInput.setAttribute("accept", "image/*");
  form.appendChild(imageInput);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const closeButton = createElement(
    "button",
    "modal-close-button",
    ["btn", "btn-primary", "m-2", "primary-colour"],
    modalFooter
  );
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => {
    $("#" + modalId).modal("hide");
  });

  const submitButton = createElement(
    "button",
    "modal-comment-button",
    ["btn", "btn-primary", "m-2", "primary-colour"],
    modalFooter
  );
  submitButton.innerText = submitString;
  submitButton.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const imageFile = imageInput.files[0];

    let dataUrl = Promise.resolve(fileToDataUrl(imageFile));
    dataUrl.then((data) => {
      if (imageFile) {
        updateProfile(email, password, name, data);
      } else {
        updateProfile(email, password, name, null);
      }
    });

    $("#" + modalId).modal("hide");

    let updatedUser = Promise.resolve(getUser(user.id));
    updatedUser.then((data) => {
      showUserProfile(data);
    });
  });

  // Append all modal parts together
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  // Show the modal
  $("#" + modalId).modal("show");
};
