import {cardView} from '../../tmp/templates';
import {cardsToContext} from './cardViewModel';
import {addCardsHandler} from './handlers';

let cardWrapper;

/**
* @param {Array} cards Массив карточек с ключем-типом
* @returns {Object} wrapper для карточек
*/
const init = (cards) => {
    if(!history.state){
        history.pushState(cards, "");
    }
    let cardWrapper = document.querySelector('.wrapper');
    let cardsViewModel = cardsToContext(cards);
    let cardsInner = cardsViewModel.map((card) => (cardView(card))).join('')

    cardWrapper.innerHTML = cardsInner;
    addCardsHandler(cardWrapper, cards);

    return cardWrapper;
}

init(cards);
window.onpopstate = (e) => {
    if(e.state){
        init(e.state);
    }
}
