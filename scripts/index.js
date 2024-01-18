// Ф-ия удаления карточки мест
const deleteCard = (evt) => {
    const cardsList = document.querySelector('.places__list');
    const card = evt.target.parentElement
    cardsList.removeChild(card)
}

// Ф-ия создание карточки мест
function createCard(name, link, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.cloneNode(true);

    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').alt = name;
    card.querySelector('.card__image').src = link;
    card.querySelector('.card__delete-button').addEventListener('click', (evt) => deleteCard(evt))

    return card
}

// Создание карточек из массива 
initialCards.forEach(function (item) { 
    const cardsList = document.querySelector('.places__list');
    cardsList.append(createCard(item.name, item.link, deleteCard))    
})