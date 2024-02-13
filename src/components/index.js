import "../pages/index.css";
import { initialCards, createCard, deleteCard, likeCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
// Parent element for cards
const cardsList = document.querySelector(".places__list");
// Modals buttons
const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
// Modals elements
const editModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
// Edit form
const profileForm = editModal.querySelector(".popup__form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const nameElem = document.querySelector(".profile__title");
const jobElem = document.querySelector(".profile__description");
// Card form
const newCardForm = newCardModal.querySelector(".popup__form");
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const urlInput = newCardForm.querySelector(".popup__input_type_url");
// Image modal
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");

// Open image
const openImage = (evt) => {
  const { classList: target } = evt.target;

  if (target.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageModal);
    document.addEventListener("keydown", handleEscape);
  }
};

// Create cards from array
initialCards.forEach(function (item) {
  cardsList.append(
    createCard(item.name, item.link, deleteCard, likeCard, openImage)
  );
});

// Open modals
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

editButton.addEventListener("click", function () {
  openModal(editModal);
  document.addEventListener("keydown", handleEscape);
  nameInput.value = nameElem.textContent;
  jobInput.value = jobElem.textContent;
});

newCardButton.addEventListener("click", function () {
  openModal(newCardModal);
  document.addEventListener("keydown", handleEscape);
});

// Modal Close
editModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(editModal);
    profileForm.reset();
    document.removeEventListener("keydown", handleEscape);
  }
});

newCardModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(newCardModal);
    newCardForm.reset();
    document.removeEventListener("keydown", handleEscape);
  }
});

imageModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(imageModal);
    document.removeEventListener("keydown", handleEscape);
  }
});

// Default value for inputs in edit form
nameInput.value = nameElem.textContent;
jobInput.value = jobElem.textContent;

// Edit form
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  nameElem.textContent = name;
  jobElem.textContent = job;

  // Close edit modal
  closeModal(editModal);
}

// Add event listener to edit form
profileForm.addEventListener("submit", handleEditFormSubmit);

// Add new card
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = titleInput.value;
  const url = urlInput.value;

  cardsList.prepend(createCard(title, url, deleteCard, likeCard, openImage));
  closeModal(newCardModal);
  newCardForm.reset();
});
