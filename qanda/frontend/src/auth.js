import { postPutApiCall, goToPage, clearChildren } from "./helpers.js";
import { displayErrorModal } from "./error.js";
import { loadThreads, getThreads } from "./thread.js";

export const login = () => {
    const body = {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
    };

    postPutApiCall("auth/login", "POST", body, "Login Error", (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        let n = Promise.resolve(getThreads(0));
        n.then((data) => {
            if (data.length > 0) {
                loadThreads(0)
            }
        })
        goToPage("dashboard");
    });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    clearChildren(document.getElementById("indiv-thread-screen"));
    goToPage("login-form");
};

export const register = () => {
    // check if passwords are matching
    if (
        document.getElementById("register-password").value !=
        document.getElementById("confirm-password").value
    ) {
        displayErrorModal(
            "Registration Error",
            "Passwords do not match, please re-enter passwords."
        );

        // reset password inputs
        document.getElementById("register-password").value = "";
        document.getElementById("confirm-password").value = "";
        return;
    }

    // no errors
    const body = {
        email: document.getElementById("register-email").value,
        password: document.getElementById("register-password").value,
        name: document.getElementById("register-name").value,
    };

    postPutApiCall("auth/register", "POST", body, "Registration Error", (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        // check if there are any threads
        let n = Promise.resolve(getThreads(0));
        n.then((data) => {
            if (data.length > 0) {
                loadThreads(0)
            }
        })
        goToPage("dashboard");
    });
};

export const registerNow = (event) => {
    event.preventDefault();
    goToPage("register-form");
};
