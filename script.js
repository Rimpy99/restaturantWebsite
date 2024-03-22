import { PIZZA_DATA } from './pizzaData.js';

const changePriceFormat = (price) => price.toString().replace('.', ',');

const buttonsNodeList = document.querySelectorAll('.pizza-block-button');
const buttons = Array.from(buttonsNodeList);

buttons.forEach(btn => btn.addEventListener('click', () => {
    document.querySelector('.pizza-background').style.display = 'block';
}))