import { displayErrorModal } from "./error.js";
import {
    postPutApiCall,
    getApiCall,
    getTime,
    svgButton,
    createElement,
    clearChildren,
} from "./helpers.js";
import { showIndividualThreadScreen, getThread, createAuthorLink } from "./thread.js";
import { getUser } from "./user.js";

export const getComments = (threadId) => {
    return new Promise((resolve) => {
        getApiCall(
            "comments",
            "Comment Retrieval Error",
            "threadId=" + threadId,
            (data) => {
                resolve(data);
            }
        );
    });
};

export const createComment = (content, threadId, parentCommentId) => {

    const body = {
        content: content,
        threadId: threadId,
        parentCommentId: parentCommentId,
    };

    postPutApiCall("comment", "POST", body, "Comment Creation Error", (data) => {
        localStorage.setItem("commentId", data.id);
    });
};

export const editComment = (id, content) => {
    const body = {
        id: id,
        content: content,
    };

    postPutApiCall("comment", "PUT", body, "Comment Edit Error", (data) => {
        localStorage.setItem("commentId", data.id);
    });
};
export const dislikeComment = (commentId) => {
    const body = {
        id: commentId,
        turnon: false,
    };
    postPutApiCall("comment/like", "PUT", body, "Liking Comment Error", () => { });
};

export const likeComment = (commentId) => {
    const body = {
        id: commentId,
        turnon: true,
    };
    postPutApiCall("comment/like", "PUT", body, "Liking Comment Error", () => { });
};

export const createModal = (
    threadId,
    comment,
    modalId,
    title,
    submitString
) => {
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
    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control");
    textarea.setAttribute("rows", "5");
    modalBody.appendChild(textarea);

    // reply-modal
    if (modalId === "edit-modal") {
        textarea.value = comment.content;
    }

    // Modal footer
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
        if (modalId === "reply-modal") {
            replyModalCheck(modal, localStorage.getItem("threadId"), localStorage.getItem("commentId"));
        } else {
            editModalCheck(modal, localStorage.getItem("threadId"), comment.id);
        }
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

const replyModalCheck = (modal, threadId, parentId) => {
    const modalId = modal.getAttribute("id");
    const textarea = modal.querySelector("textarea");
    const text = textarea.value;
    if (text.trim() !== "") {
        createComment(textarea.value, threadId, parentId);
        $("#" + modalId).modal("hide");
        // Clear the textarea
        textarea.value = "";
        showIndividualThreadScreen(threadId);
    } else {
        $("#" + modalId).modal("hide");

        displayErrorModal(
            "Reply Error",
            "Please enter your reply before commenting."
        );
    }
};

const editModalCheck = (modal, threadId, commentId) => {
    const modalId = modal.getAttribute("id");
    const textarea = modal.querySelector("textarea");
    const text = textarea.value;
    if (text.trim() !== "") {
        editComment(commentId, textarea.value);
        $("#" + modalId).modal("hide");
        // Clear the textarea
        textarea.value = "";
        showIndividualThreadScreen(threadId);
    } else {
        $("#" + modalId).modal("hide");
        displayErrorModal(
            "Reply Error",
            "Please enter a comment before commenting."
        );
    }
};

// creates the comment elements.
// if a comment has a parent, appends the comment to the parent.
export const createCommentElement = (threadId, comment, previous, appendToElement) => {
    const commentStack = document.createElement("div");
    commentStack.classList.add(
        "d-flex",
        "flex-column",
        "border-top",
        "border-left",
    );
    commentStack.setAttribute("id", "comment-" + comment.id);

    const commentElement = createElement("div", null, ["d-flex", "flex-row", "margin-2"], commentStack);
    let user = Promise.resolve(getUser(comment.creatorId));
    user.then((data) => {
        const profilePicture = createElement("img", null, ["profile-picture"], commentElement);

        if (data.image) {
            profilePicture.src = data.image;
        } else {
            profilePicture.src = "assets/user.png";
        }
        // profile picture
        profilePicture.setAttribute("alt", "PFP");

        const commentContentContainer = createElement("div", "comment-content", ["d-flex", "flex-column"], commentElement);

        // user
        createAuthorLink(commentContentContainer, comment);

        // comment content
        const commentContent = createElement("h5", null, ["m-2", "text-muted"], commentContentContainer);
        commentContent.innerText = comment.content;

        // Time since commented
        const timeSinceCommented = createElement("div", null, ["text-muted", "m-1"], commentContentContainer);
        const timeAgo = getTime(comment.createdAt);
        timeSinceCommented.innerText = timeAgo;

        // Likes
        const likesContainer = createElement(
            "div",
            "",
            ["d-flex", "flex-row"],
            commentContentContainer
        );
        const likes = createElement("p", null, ["text-muted", "m-1"], likesContainer);
        likes.innerText = comment.likes.length;
        likes.setAttribute("id", "comment-likes-" + comment.id);
        const likesTitle = createElement(
            "p",
            null,
            ["text-muted", "m-1"],
            likesContainer
        );
        likesTitle.innerText = " like(s)";

        // buttons
        const replyButtonContainer = createElement("div", null, null, commentContentContainer);

        // like button
        if (comment.likes.includes(parseInt(localStorage.getItem("userId")))) {
            makeDislikeButton(threadId, comment, replyButtonContainer);
        } else {
            makeLikeButton(threadId, comment, replyButtonContainer);
        }
        // reply button
        makeReplyButton(threadId, comment, replyButtonContainer);
        makeEditButton(threadId, comment, replyButtonContainer);

        if (appendToElement !== document.getElementById("comments-container")) {
            clearChildren(replyButtonContainer);
        }
        // check if comment has a parent
        if (comment.parentCommentId === null) {
            if (previous === undefined) {
                appendToElement.appendChild(commentStack);
            } else {
                appendToElement.insertBefore(commentStack, document.getElementById("comment-" + previous.id));
            }

        } else {
            // add to the parents commentStack
            // check if there is already a comment under the parentStack
            let parentNode = document.getElementById("comment-" + comment.parentCommentId);
            if (parentNode.childNodes[1]) {
                parentNode.insertBefore(commentStack, parentNode.childNodes[1]);
            } else {
                parentNode.appendChild(commentStack);
            }
            const marginLeft = parseInt(commentStack.style.marginLeft) || 0;
            commentStack.style.marginLeft = (marginLeft + 30) + "px";
        }
    });


};

// makeLikeButton(threadId, comment, replyButtonContainer);
const makeLikeButton = (threadId, comment, appendToElement) => {
    const likeButton = svgButton("like", appendToElement);
    likeButton.addEventListener("click", () => {
        // check locked
        ((threadId, comment) => {
            // check locked
            let thread = Promise.resolve(getThread(threadId));
            thread.then((data) => {
                if (data.lock) {
                    displayErrorModal(
                        "Locked Thread",
                        "Can't like a comment on a locked thread"
                    );
                } else {
                    document.getElementById("comment-likes-" + comment.id).innerText++;
                    likeComment(comment.id);
                    clearChildren(appendToElement);
                    makeDislikeButton(threadId, comment, appendToElement);
                    makeReplyButton(threadId, comment, appendToElement);
                    makeEditButton(threadId, comment, appendToElement);
                }
            });
        })(threadId, comment);
    });
};

const makeDislikeButton = (threadId, comment, appendToElement) => {
    const dislikeButton = svgButton("dislike", appendToElement);
    dislikeButton.addEventListener("click", () => {
        // check locked
        ((threadId, comment) => {
            // check locked
            let thread = Promise.resolve(getThread(threadId));
            thread.then((data) => {
                if (data.lock) {
                    displayErrorModal(
                        "Locked Thread",
                        "Can't un-like a comment on a locked thread"
                    );
                } else {
                    if (
                        parseInt(
                            document.getElementById("comment-likes-" + comment.id).innerText
                        ) > 0
                    ) {
                        document.getElementById("comment-likes-" + comment.id).innerText--;
                        dislikeComment(comment.id);
                        clearChildren(appendToElement);
                        makeLikeButton(threadId, comment, appendToElement);
                        makeReplyButton(threadId, comment, appendToElement);
                        makeEditButton(threadId, comment, appendToElement);
                    }
                }
            });
        })(threadId, comment);
    });
};

const makeReplyButton = (threadId, comment, appendToElement) => {
    const replyButton = createElement(
        "button",
        "reply-comment-button-" + comment.id,
        ["btn", "btn-primary", "m-2", "primary-colour"],
        appendToElement
    );
    replyButton.innerText = "Reply";

    replyButton.addEventListener("click", () => {
        ((threadId, comment) => {
            // check locked
            localStorage.setItem("commentId", comment.id);
            let thread = Promise.resolve(getThread(threadId));
            thread.then((data) => {
                if (data.lock) {
                    displayErrorModal(
                        "Locked Thread",
                        "Can't reply to a comment on a locked thread"
                    );
                } else {
                    createModal(
                        threadId,
                        comment,
                        "reply-modal",
                        "Reply to Comment",
                        "Reply"
                    );
                }
            });
        })(threadId, comment);

    });
};

const makeEditButton = (threadId, comment, appendToElement) => {
    if (comment.creatorId === parseInt(localStorage.getItem("userId"))) {
        // edit button
        const editButton = createElement(
            "button",
            "reply-edit-button",
            ["btn", "btn-primary", "m-2", "primary-colour"],
            appendToElement
        );
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            // open edit form
            createModal(
                threadId,
                comment,
                "edit-modal",
                "Edit your Comment",
                "Comment"
            );
        });
    }
};
