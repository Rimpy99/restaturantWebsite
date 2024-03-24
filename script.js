import { PIZZA_DATA } from './pizzaData.js';

//elementy do okna wyboru opcji do pizzy
const addPizzaButtons = Array.from(document.querySelectorAll('.add-pizza-button'));
const addPizzaModalBackground = document.querySelector('#pizza-modal-background');
const addPizzaModal = document.querySelector('#pizza-modal');
const elementsToClosePizzaModal = Array.from(document.querySelectorAll('.pizza-modal-close'));
const addToOrdersBtn = document.querySelector('#add-to-orders-btn');
const basketOrderCounter = document.querySelector('#basket-orders-counter');
//elementy do okna zamówienia
const basketBtn = document.querySelector('#basket-orders-btn');
const ordersModal = document.querySelector('#orders-modal');
const ordersModalBackground = document.querySelector('#orders-modal-background');
const elementsToCloseOrdersModal = Array.from(document.querySelectorAll('.orders-modal-close'));

const changePriceFormat = (price) => price.toString().replace('.', ',');

let orders = [];
let currentPizzaId = 0;
let currentOrderId = 0;

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
    console.log(selectedSize)
    const tomatoSauce = document.querySelector('#tomato-sauce-checkbox').checked;
    const garlicSauce = document.querySelector('#garlic-sauce-checkbox').checked;
    
    orders.push({
        id: currentPizzaId,
        orderId: currentOrderId,
        size: selectedSize,
        tomatoSauce,
        garlicSauce,
    })

    currentOrderId++;

    basketOrderCounter.innerText = orders.length;

    closePizzaModal();
    setPizzaModalToDefault();
});

//do otwarcia okna z zamówieniem
basketBtn.addEventListener('click', () => {
    ordersModalBackground.style.display = 'block';
    ordersModal.style.display = 'block';

    displayAllPizzas();

    document.addEventListener('keydown', (event) => event.key == 'Escape' && closeOrderModal()); 
});

//do zamknięcia okna z zamówieniem
const closeOrderModal = () => {
    ordersModalBackground.style.display = 'none';
    ordersModal.style.display = 'none';
}

//elementy, które wywołują zamknięcie okna z zamówieniem
elementsToCloseOrdersModal.forEach(elem => elem.addEventListener('click', () => closeOrderModal()));

//do wyświetlenia zamówienia w oknie zamówienia
const displayAllPizzas = () => {
    const spaceWhereOrderIsDisplayed = document.querySelector("#orders-modal-content-container");
    spaceWhereOrderIsDisplayed.innerHTML = "";

    if(orders.length){
        spaceWhereOrderIsDisplayed.innerHTML = `
            <div class="orders-modal-content">
                <hr>
                ${orders.map(({id, orderId, size, tomatoSauce, garlicSauce}) => 
                    `
                        <div class="orders-modal-content-element">
                            <h2>${PIZZA_DATA[id].name} (${size == 'normal' ? 'średnia' : 'duża'})</h2>
                            <div class="orders-modal-content-element-right">
                                <h2>${size == 'normal' ? changePriceFormat(PIZZA_DATA[id].normalSizePrice) : changePriceFormat(PIZZA_DATA[id].bigSizePrice)} zł</h2>
                                <i class="fa-solid fa-trash-can trash-btn" id="${orderId}-pizza"></i>
                            </div>
                        </div>
                        ${tomatoSauce ? `
                            <div class="orders-modal-content-element">
                                <h3 class="order-modal-sauce">Sos pomidorowy</h3>
                                <div class="orders-modal-content-element-right">
                                    <h3 class="order-modal-sauce">+ 2,50 zł</h3>  
                                    <i class="fa-solid fa-trash-can trash-btn" id="${orderId}-tomatoSauce"></i>
                                </div>
                            </div>` : ''
                        }
                        ${garlicSauce ? `
                            <div class="orders-modal-content-element">
                                <h3 class="order-modal-sauce">Sos czosnkowy</h3>
                                <div class="orders-modal-content-element-right">
                                    <h3 class="order-modal-sauce">+ 2,50 zł</h3>  
                                    <i class="fa-solid fa-trash-can trash-btn" id="${orderId}-garlicSauce"></i>
                                </div>
                            </div>` : ''
                        }
                        <hr>
                    `
                ).join('')}
                <div class="orders-modal-content-element">
                    <h2>W SUMIE:</h2>
                    <h2>${changePriceFormat(sumPrice())} zł</h2>
                </div>
                <div>
                    <form class="orders-form">
                        <label for="name">Wpisz swoje imię:</label><br>
                        <div style="display: flex; align-items: center;">
                            <input type="text" name="name" id="input-name">
                            <div id="name-error"></div>
                        </div>
                        <br>
                    
                        <label for="address">Wpisz adres, gdzie ma być dostarczone zamówienie:</label><br>
                        <div style="display: flex; align-items: center;">
                            <input type="text" name="address" id="input-address">
                            <div id="address-error"></div>
                        </div>
                        <br>
                    
                        <label for="phoneNumber">Wpisz swój numer telefonu:</label><br>
                        <div style="display: flex; align-items: center;">
                            <input type="tel" name="phoneNumber" pattern="[0-9]*" id="input-phoneNumber">
                            <div id="phoneNumber-error"></div>
                        </div>
                        <br>
                    </form>
                </div>
                <div class="orders-modal-content-btn-container">
                    <button class="btn" id="order-submit-btn">Przejdź do płatności</button>
                </div>
            </div>
        `;

        const trashBtns = Array.from(document.querySelectorAll('.trash-btn'));

        trashBtns.forEach(btn => btn.addEventListener('click', () => {
            const [id, elemToRemove] = btn.id.split('-');
            removeItemFromOrder(parseInt(id), elemToRemove);
        }));

        document.querySelector('#input-phoneNumber').addEventListener('input', (event) => {
            const input = event.target;
            input.value = input.value.replace(/\D/g, '');

            if (input.value.length > 9) {
                input.value = input.value.slice(0, 9);
            }
        });

        document.querySelector("#order-submit-btn").addEventListener('click', () => checkOrderForm());

        const checkOrderForm = () => {
            const name = document.querySelector('#input-name').value;
            const address = document.querySelector('#input-address').value;
            const phoneNumber = document.querySelector('#input-phoneNumber').value;

            document.querySelector('#name-error').innerHTML = `${!name.replace(/\s/g, '').length ? "<p>Wpisz swoje imię.</p>" : ""}`;

            document.querySelector('#address-error').innerHTML = `${!address.replace(/\s/g, '').length ? "<p>Wpisz swój adres.</p>" : ""}`;

            document.querySelector('#phoneNumber-error').innerHTML = `${phoneNumber.length != 9 ? "<p>Wpisz swój numer telefonu.</p>" : ""}`;
        };
    }else{
        spaceWhereOrderIsDisplayed.innerHTML = `
            <div class="orders-modal-content-empty">
                <h2>Twoje zamówienie jest puste<h2>
            </div>
        `;
    }
}

//do usuwania elementu z zamówienia
const removeItemFromOrder = (id, elemToRemove) => {
    if(elemToRemove == 'pizza'){
        orders = orders.filter(order => order.orderId != id);
    }else if(elemToRemove == 'tomatoSauce'){
        orders.find(order => order.orderId == id).tomatoSauce = false;
    }else if(elemToRemove == 'garlicSauce'){
        orders.find(order => order.orderId == id).garlicSauce = false;
    }

    displayAllPizzas();
}

//do zsumowania ceny za zamówienie
const sumPrice = () => {
    let price = 0;

    orders.forEach(({id, size, tomatoSauce, garlicSauce}) => {
        price += (size == 'normal' ? PIZZA_DATA[id].normalSizePrice : PIZZA_DATA[id].bigSizePrice);
        price += (tomatoSauce ? 2.50 : 0);
        price += (garlicSauce ? 2.50 : 0);
    });

    return price;
}