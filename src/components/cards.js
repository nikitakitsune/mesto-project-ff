const cardsList = document.querySelector(".places__list");

import { deleteCardFromServer, likeCardOnServer } from "./api";

// Likes functional
export const likeCard = (evt, cardId, isLiked) => {
  const likeButton = evt.target;
  const likeCounter = likeButton
    .closest(".card")
    .querySelector(".card__likes-counter");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeCardOnServer(cardId, true)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardOnServer(cardId, false)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Delete card function
export const deleteCard = (evt, cardId) => {
  const card = evt.target.closest(".places__item.card");
  deleteCardFromServer(cardId)
    .then(cardsList.removeChild(card))
    .catch((err) => {
      console.log(err);
    });
};

// Create card function
export const createCard = (
  cardId,
  name,
  link,
  likes,
  deleteCard,
  likeFunction,
  openFunction,
  isRemovable,
  isLiked
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  card.querySelector(".card__likes-counter").textContent = likes;

  if (isRemovable) {
    card
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => deleteCard(evt, cardId));
    card.querySelector(".card__delete-button").style.display = "block";
  } else {
    card.querySelector(".card__delete-button").style.display = "none";
  }

  if (isLiked) {
    card
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  } else {
    card
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_is-active");
  }

  card
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeFunction(evt, cardId, isLiked));

  cardImage.addEventListener("click", openFunction);

  return card;
};
