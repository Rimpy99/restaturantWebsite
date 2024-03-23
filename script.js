import { PIZZA_DATA } from './pizzaData.js';

const addPizzaButtons = Array.from(document.querySelectorAll('.add-pizza-button'));
const modalBackground = document.querySelector('#pizza-modal-background');
const addPizzaModal = document.querySelector('#pizza-modal');
const elementsToCloseModal = Array.from(document.querySelectorAll('.pizza-modal-close'));
const addToOrdersBtn = document.querySelector('#add-to-orders-btn');
const basketOrderCounter = document.querySelector('#basket-order-counter');

const changePriceFormat = (price) => price.toString().replace('.', ',');

const orders = [];
let currentPizzaId = 0;

//do otwierania okna z wyborem opcji do pizzy
addPizzaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentPizzaId = parseInt(btn.value[btn.value.length - 1]);
        const selectedPizzaData = PIZZA_DATA[currentPizzaId];
        
        modalBackground.style.display = 'block';

        document.querySelector('#pizza-modal-name').textContent = selectedPizzaData.name;
        document.querySelector('#pizza-modal-desc').textContent = selectedPizzaData.desc;
        document.querySelector('#pizzaSizeOption1').textContent = `średnia - 30cm: ${changePriceFormat(selectedPizzaData.normalSizePrice)} zł`;
        document.querySelector('#pizzaSizeOption2').textContent = `duża - 40cm: ${changePriceFormat(selectedPizzaData.bigSizePrice)} zł`;

        addPizzaModal.style.display = 'block';

        document.addEventListener('keydown', (event) => event.key == 'Escape' && closeModal());        
    });
});

//do zamykania okna z wyborem opcji do pizzy
const closeModal = () => {
    modalBackground.style.display = 'none';
    addPizzaModal.style.display = 'none';
    setPizzaModalToDefault();
};

//kiedy się kliknie na jakikolwiek element, który służy do zamykania okna
elementsToCloseModal.forEach(elem => elem.addEventListener('click', () => closeModal()));

//do ustawienia ponownie wartości na początkowe po opuszczeniu okna z wyborem opcji do pizzy
const setPizzaModalToDefault = () => {
    document.querySelector('.pizza-modal-select').value = "normal";
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

    closeModal();
    setPizzaModalToDefault();
});