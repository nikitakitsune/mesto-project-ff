function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.classList.remove("popup_is-animated");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.add("popup_is-animated");
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export { openModal, closeModal };
