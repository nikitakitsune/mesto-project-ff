// @todo: Темплейт карточки ✓

// @todo: DOM узлы ✓

// @todo: Функция создания карточки ✓

// @todo: Функция удаления карточки ✓

// @todo: Вывести карточки на страницу ✓

function deleteCard(evt) {
    const card = evt.target.parentElement
    const cardsList = document.querySelector('.places__list');
    cardsList.removeChild(card)
}

function createCard(name, link) {
    const cardsList = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').alt = name;
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt))

    cardsList.append(card)
}

initialCards.forEach(function (item) { 
    createCard(item.name, item.link)    
})