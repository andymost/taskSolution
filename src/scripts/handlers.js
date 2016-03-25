import {cardToContext} from './cardViewModel';
import {cardView} from '../../tmp/templates';
import {elementFromString} from './utils';

let cardHandler;

const addCard = (lastCard, isWide, cards) => {
    cards.push({type: isWide? 'wide' : 'narrow'});
    history.pushState(cards, '');
    lastCard.classList.remove('__shifted');
    lastCard.removeEventListener('click', cardHandler);
    const context = cardToContext(cards[cards.length - 1], cards.length - 1, cards);
    const cardElem = elementFromString(cardView(context));
    lastCard.parentElement.appendChild(cardElem);
    cardHandler = clickHandler(cards);
    cardElem.addEventListener('click', cardHandler);
};

const removeCard = (card, cards) => {
    const lastCard = card.previousElementSibling;
    card.remove();
    cards.pop();
    history.pushState(cards, '');
    if(lastCard){
        cardHandler = clickHandler(cards);
        lastCard.addEventListener('click', cardHandler);
        if(cards.length > 1){
            lastCard.classList.add('__shifted');
        }
    }
};


const clickHandler = (cards) => (e) => {
    const {shiftKey, altKey, target} = e;

    if(!shiftKey){
        removeCard(target, cards);
    } else {
        addCard(target, altKey, cards);
    }

}

export const addCardsHandler = (wrapper, cards) => {
    let lastCard = wrapper.lastElementChild;
    if(lastCard){
        cardHandler = clickHandler(cards);
        lastCard.addEventListener('click', cardHandler);
    }
}
