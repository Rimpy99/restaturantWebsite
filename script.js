import { PIZZA_DATA } from './pizzaData.js';

//elementy do okna wyboru opcji do pizzy
const addPizzaButtons = Array.from(document.querySelectorAll('.add-pizza-button'));
const addPizzaModalBackground = document.querySelector('#pizza-modal-background');
const addPizzaModal = document.querySelector('#pizza-modal');
const elementsToClosePizzaModal = Array.from(document.querySelectorAll('.pizza-modal-close'));
const addToOrdersBtn = document.querySelector('#add-to-orders-btn');
const basketOrderCounter = document.querySelector('#basket-orders-counter');
//elementy do okna zamówienia
const basketBtn = document.querySelector('#basket-orders-counter');
const ordersModal = document.querySelector('#orders-modal');
const ordersModalBackground = document.querySelector('#orders-modal-background');
const elementsToCloseOrdersModal = Array.from(document.querySelectorAll('.orders-modal-close'));

const changePriceFormat = (price) => price.toString().replace('.', ',');

let orders = [];
let currentPizzaId = 0;

//do otwierania okna z wyborem opcji do pizzy
addPizzaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPizzaId = parseInt(btn.value[btn.value.length - 1]);
        const selectedPizzaData = PIZZA_DATA[currentPizzaId];
        
        addPizzaModalBackground.style.display = 'block';

        document.querySelector('#pizza-modal-name').textContent = selectedPizzaData.name;
        document.querySelector('#pizza-modal-desc').textContent = selectedPizzaData.desc;
        document.querySelector('#pizzaSizeOption1').textContent = `średnia - 30cm: ${changePriceFormat(selectedPizzaData.normalSizePrice)} zł`;
        document.querySelector('#pizzaSizeOption2').textContent = `duża - 40cm: ${changePriceFormat(selectedPizzaData.bigSizePrice)} zł`;

        addPizzaModal.style.display = 'block';

        document.addEventListener('keydown', (event) => event.key == 'Escape' && closePizzaModal());        
    });
});

//do zamykania okna z wyborem opcji do pizzy
const closePizzaModal = () => {
    addPizzaModalBackground.style.display = 'none';
    addPizzaModal.style.display = 'none';
    setPizzaModalToDefault();
};

//kiedy się kliknie na jakikolwiek element, który służy do zamykania okna
elementsToClosePizzaModal.forEach(elem => elem.addEventListener('click', () => closePizzaModal()));

//do ustawienia ponownie wartości na początkowe po opuszczeniu okna z wyborem opcji do pizzy
const setPizzaModalToDefault = () => {
    document.querySelector('.pizza-modal-select').value = 'normal';
    document.querySelector('#tomato-sauce-checkbox').checked = false;
    document.querySelector('#garlic-sauce-checkbox').checked = false;
}

//do dodania pizzy do zamówienia
addToOrdersBtn.addEventListener('click', () => {
    const selectedSize = document.querySelector('.pizza-modal-select').value;
    const tomatoSauce = document.querySelector('#tomato-sauce-checkbox').checked;
    const garlicSauce = document.querySelector('#garlic-sauce-checkbox').checked;
    
    orders.push({
        id: currentPizzaId,
        size: selectedSize,
        tomatoSauce,
        garlicSauce,
    })

    basketOrderCounter.innerText = orders.length;

    closePizzaModal();
    setPizzaModalToDefault();
});

//do otwarcia okna z zamówieniem
basketBtn.addEventListener('click', () => {
    ordersModalBackground.style.display = 'block';
    ordersModal.style.display = 'block';
    document.addEventListener('keydown', (event) => event.key == 'Escape' && closeOrderModal()); 
});

const closeOrderModal = () => {
    ordersModalBackground.style.display = 'none';
    ordersModal.style.display = 'none';
}

elementsToCloseOrdersModal.forEach(elem => elem.addEventListener('click', () => closeOrderModal()));