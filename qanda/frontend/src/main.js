import { BACKEND_PORT } from "./config.js";
import {
  clearCreate,
  clearLogin,
  clearReg,
  goToPage,
  makeBackButton,
} from "./helpers.js";
import { login, logout, register, registerNow } from "./auth.js";
import { createNewThread, editThread, loadThreads } from "./thread.js";
import { getUser, showUserProfile } from "./user.js";

let pageNumber = 0;

// login
document.getElementById("login-button").addEventListener("click", () => {
  login();
  clearLogin();
});

// logout
document.getElementById("logout-button").addEventListener("click", () => {
  logout();
});

//register now
document
  .getElementById("register-now-button")
  .addEventListener("click", (event) => {
    registerNow(event);
  });

// register
document.getElementById("register-button").addEventListener("click", () => {
  register();
  clearReg();
});

// open thread form
document
  .getElementById("create-thread-button")
  .addEventListener("click", () => {
    goToPage("create-thread-form");
  });

// back button
document
  .getElementById("create-thread-back-button")
  .addEventListener("click", () => {
    goToPage("dashboard");
  });

// create new thread
document
  .getElementById("new-thread-create-button")
  .addEventListener("click", () => {
    pageNumber = 0;
    createNewThread();
    clearCreate();
  });

// edit thread
document
  .getElementById("submit-edited-thread-button")
  .addEventListener("click", () => {
    editThread(pageNumber);
  });

// view profile
document.getElementById("profile-button").addEventListener("click", () => {
  let user = Promise.resolve(getUser(localStorage.getItem("userId")));
  user.then((data) => {
    showUserProfile(data);
  });
});
if (localStorage.getItem("token") != null) {
  loadThreads(pageNumber);
  goToPage("dashboard");
} else {
  goToPage("login-form");
}
