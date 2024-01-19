const cardsList = document.querySelector('.places__list');

// Ф-ия удаления карточки мест
const deleteCard = (evt) => {
    const card = evt.target.closest('.places__item.card')
    cardsList.removeChild(card)
}

// Ф-ия создание карточки мест
function createCard(name, link, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__image')

    card.querySelector('.card__title').textContent = name;
    cardImage.alt = name;
    cardImage.src = link;
    card.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt))

    return card
}

// Создание карточек из массива 
initialCards.forEach(function (item) { 
    cardsList.append(createCard(item.name, item.link, deleteCard))    
})