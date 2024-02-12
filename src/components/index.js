import "../pages/index.css";
import { initialCards, createCard, deleteCard } from "./cards.js";
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
const editFormElement = editModal.querySelector(".popup__form");
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(
  ".popup__input_type_description"
);
const nameElem = document.querySelector(".profile__title");
const jobElem = document.querySelector(".profile__description");
// Card form
const newCardForm = newCardModal.querySelector(".popup__form");
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const urlInput = newCardForm.querySelector(".popup__input_type_url");

// Likes functional
const likeCard = (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("card__like-button_is-active")) {
    target.remove("card__like-button_is-active");
  } else {
    target.add("card__like-button_is-active");
  }
};

// Open image
const openImage = (evt) => {
  const popupImage = imageModal.querySelector(".popup__image")
  const popupCaption = imageModal.querySelector(".popup__caption")
  const { classList: target } = evt.target;

  if (target.contains("card__image")) {
    popupImage.src = evt.target.src
    popupCaption.textContent = evt.target.alt
    openModal(imageModal)
  }
}


// Create cards from array
initialCards.forEach(function (item) {
  cardsList.append(createCard(item.name, item.link, deleteCard, likeCard, openImage));
});

// Open modals
editButton.addEventListener("click", function () {
  openModal(editModal);
});

newCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});


// Modal Close
editModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(editModal);
    nameInput.value = nameElem.textContent;
    jobInput.value = jobElem.textContent;
  }
});

editModal.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal(el);
    evt.reset();
    nameInput.value = nameElem.textContent;
    jobInput.value = jobElem.textContent;
  }
});

newCardModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(newCardModal);
    newCardForm.reset();
  }
});

newCardModal.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal(newCardModal);
    newCardForm.reset();
  }
});

imageModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(imageModal);
  }
});

imageModal.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModal(imageModal);
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
editFormElement.addEventListener("submit", handleEditFormSubmit);

// Add new card
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = titleInput.value;
  const url = urlInput.value;

  cardsList.prepend(createCard(title, url, deleteCard, likeCard, openImage));
  closeModal(newCardModal);
  newCardForm.reset();
});
