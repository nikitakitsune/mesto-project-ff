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

console.log(document.forms);

// Create cards from array
initialCards.forEach(function (item) {
  cardsList.append(createCard(item.name, item.link, deleteCard));
});

// Open modals
editButton.addEventListener("click", function () {
  openModal(editModal);
});

newCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

// Close modals function
const addCloseEvent = (el) => {
  el.addEventListener("click", (evt) => {
    const { classList: target } = evt.target;
    if (target.contains("popup__close") || target.contains("popup")) {
      closeModal(el);
    }
  });

  // Close by Escape key
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(el);
    }
  });
};

// Adding a close function to each modals
[editModal, newCardModal, imageModal].forEach(addCloseEvent);

// Likes functional
cardsList.addEventListener("click", function (evt) {
  const { classList: target } = evt.target;
  if (target.contains("card__like-button")) {
    if (target.contains("card__like-button_is-active")) {
      target.remove("card__like-button_is-active");
    } else {
      target.add("card__like-button_is-active");
    }
  }
});
