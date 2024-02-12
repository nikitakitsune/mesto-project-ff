function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.classList.remove("popup_is-animated")
}

function closeModal(modal) {
  modal.classList.add("popup_is-animated");
  modal.classList.remove("popup_is-opened")
}

export { openModal, closeModal };
