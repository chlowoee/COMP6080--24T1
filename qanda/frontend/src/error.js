export const displayErrorModal = (title, body) => {
  // populate the modal's error title and body
  document.getElementById("error-title").textContent = title;
  document.getElementById("error-body").textContent = body;
  $("#error-modal").modal("show");
};
