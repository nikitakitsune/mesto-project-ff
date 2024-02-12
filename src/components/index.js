import "../pages/index.css";
import { initialCards, createCard, deleteCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
// Parent element for cards
const cardsList = document.querySelector(".places__list");
// Modal buttons
const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button")
const closeButton = document.querySelector(".popup__close");
// Modal elements
const popup = document.querySelector(".popuop");
const editModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");

// Create cards from array
initialCards.forEach(function (item) {
  cardsList.append(createCard(item.name, item.link, deleteCard));
});

// Open modals
editButton.addEventListener("click", function () {
  openModal(editModal);
});

newCardButton.addEventListener("click" function () {
  openModal(newCardModal);
})
// Close modals
