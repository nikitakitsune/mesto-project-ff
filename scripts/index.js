// @todo: Темплейт карточки ✓

// @todo: DOM узлы ✓

// @todo: Функция создания карточки ✓

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу ✓


function createCard(name, link) {
    const cardsList = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').alt = name;
    card.querySelector('.card__image').src = link;

    cardsList.append(card)
}

initialCards.forEach(function (item) { 
    createCard(item.name, item.link)    
})