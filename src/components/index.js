import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
// Parent element for cards
const cardsList = document.querySelector(".places__list");
// Modals buttons
const editButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");
// Modals elements
const editModal = document.querySelector(".popup_type_edit");
const editAvatarModal = document.querySelector(".popup_type_edit-avatar");
const newCardModal = document.querySelector(".popup_type_new-card");
const imageModal = document.querySelector(".popup_type_image");
// Avatar form
const avatarForm = editAvatarModal.querySelector(".popup__form");
const avatar = document.querySelector(".profile__image");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");
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

// Api
import {
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  addCard,
  updateAvatar,
} from "./api.js";
// Account id
let userId = null;

// Validation config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

import {
  enableValidation,
  clearValidation,
  toggleButtonState,
} from "./validation.js";

// Enable validation
enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    avatar.style.backgroundImage = `url(${userData.avatar})`;
    nameElem.textContent = userData.name;
    jobElem.textContent = userData.about;
    userId = userData._id;

    cards.forEach(function (item) {
      const isLiked = item.likes.some((like) => like._id === userId);
      cardsList.append(
        createCard(
          item._id,
          item.name,
          item.link,
          Object.keys(item.likes).length,
          deleteCard,
          likeCard,
          openImage,
          item.owner._id === userId,
          isLiked
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Open image
const openImage = (evt) => {
  const { classList: target } = evt.target;

  if (target.contains("card__image")) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageModal);
  }
};

// Open modals
editButton.addEventListener("click", function () {
  openModal(editModal);
  nameInput.value = nameElem.textContent;
  jobInput.value = jobElem.textContent;
});

newCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

avatar.addEventListener("click", function () {
  openModal(editAvatarModal);
});

// Modal Close
editAvatarModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(editAvatarModal);
    clearValidation(avatarForm, validationConfig);
  }
});

editModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(editModal);
    clearValidation(profileForm, validationConfig);
  }
});

newCardModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(newCardModal);
    clearValidation(newCardForm, validationConfig);
  }
});

imageModal.addEventListener("click", (evt) => {
  const { classList: target } = evt.target;
  if (target.contains("popup__close") || target.contains("popup")) {
    closeModal(imageModal);
  }
});

// Profile form submit
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  let name;
  let about;

  profileForm.querySelector(".popup__button").textContent = "Сохранение...";

  // Update user info on server and update DOM
  updateUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      name = res.name;
      about = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      nameElem.textContent = name;
      jobElem.textContent = about;
      closeModal(editModal);
      profileForm.querySelector(".popup__button").textContent = "Сохранить";
    });
}

// Avatar form submit
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  let image;

  avatarForm.querySelector(".popup__button").textContent = "Сохранение...";

  // Update avatar on server and update DOM
  updateAvatar(avatarInput.value)
    .then((res) => {
      image = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatar.style.backgroundImage = image;
      closeModal(editAvatarModal);
      avatarForm.reset();
      avatarForm.querySelector(".popup__button").textContent = "Сохранить";
    });
}

// Update avatar form
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Add event listener to edit form
profileForm.addEventListener("submit", handleEditFormSubmit);

// Add new card
newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  newCardForm.querySelector(".popup__button").textContent = "Создание...";

  // Add card to server and update DOM
  addCard(titleInput.value, urlInput.value)
    .then((item) => {
      const isLiked = item.likes.some((like) => like._id === userId);
      cardsList.prepend(
        createCard(
          item._id,
          item.name,
          item.link,
          Object.keys(item.likes).length,
          deleteCard,
          likeCard,
          openImage,
          item.owner._id === userId,
          isLiked
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closeModal(newCardModal);
      newCardForm.reset();
      newCardForm.querySelector(".popup__button").textContent = "Создать";
    });
});
