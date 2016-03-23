export const elementFromString = (str) => {
    const tmpElem = document.createElement('div');
    tmpElem.innerHTML = str;
    return tmpElem.firstElementChild;
}
