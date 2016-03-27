/**
* @param {Array} cards Массив карточек с ключем-типом
* @returns {Array} Массив контекстов для карточек
*/
export const cardsToContext = (cards) => (
    cards.map(cardToContext)
);

/**
* @param {Object} card Карточка
* @param {Int} index Номер карточки
* @param {Array} cards Массив карточек
*/
export const cardToContext = (card, index, cards) => (
    {
        type: card.type,
        number: index + 1
    }
);
