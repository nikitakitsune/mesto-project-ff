const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsList = document.querySelector(".places__list");

// Likes functional
const likeCard = (evt) => {
  const { classList: target } = evt.target;
  target.toggle("card__like-button_is-active");
};

// Delete card function
const deleteCard = (evt) => {
  const card = evt.target.closest(".places__item.card");
  cardsList.removeChild(card);
};

// Create card function
function createCard(name, link, deleteCard, likeFunction, openFunction) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  card
    .querySelector(".card__like-button")
    .addEventListener("click", likeFunction);
  cardImage.addEventListener("click", openFunction);

  return card;
}

export { initialCards, createCard, deleteCard, likeCard };
