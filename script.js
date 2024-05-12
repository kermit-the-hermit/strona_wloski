// DEFINITONS

// Database mock-up JSON 
let dataset_JSON = [{'ITEM_ID': '1', 'ITEM_NAME': 'museum', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'museo', 'ART_PLURAL': 'i', 'FILE_PATH': '/images/city', 'FILE_NAME': 'museum.jpg'},{'ITEM_ID': '2', 'ITEM_NAME': 'restaurant', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'ristorante', 'ART_PLURAL': 'i', 'FILE_PATH': '/images/city', 'FILE_NAME': 'restaurant.jpg'},{'ITEM_ID': '3', 'ITEM_NAME': 'coffe shop', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'caffè', 'ART_PLURAL': 'i', 'FILE_PATH': '/images/city', 'FILE_NAME': 'coffe-shop.jpg'},{'ITEM_ID': '4', 'ITEM_NAME': 'fruit shop', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'frutivendolo', 'ART_PLURAL': 'i', 'FILE_PATH': '/images/city', 'FILE_NAME': 'fruit-shop.jpg'},{'ITEM_ID': '5', 'ITEM_NAME': 'supermarket', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'supermercato', 'ART_PLURAL': 'i', 'FILE_PATH': '/images/city', 'FILE_NAME': 'supermarket.png'},{'ITEM_ID': '6', 'ITEM_NAME': 'gym', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'la', 'IT_SINGULAR': 'palestra', 'ART_PLURAL': 'le', 'FILE_PATH': '/images/city', 'FILE_NAME': 'gym.jpg'},{'ITEM_ID': '7', 'ITEM_NAME': 'historic city center', 'THEMATIC_SET': 'city', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'centro storico', 'ART_PLURAL': '', 'FILE_PATH': '/images/city', 'FILE_NAME': 'historic-city-center.jpg'},{'ITEM_ID': '8', 'ITEM_NAME': 'chair', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'la', 'IT_SINGULAR': 'sedia', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'chair.png'},{'ITEM_ID': '9', 'ITEM_NAME': 'fork', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'la', 'IT_SINGULAR': 'forchetta', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'fork.png'},{'ITEM_ID': '10', 'ITEM_NAME': 'firdge', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'frigo', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'fridge.jpg'},{'ITEM_ID': '11', 'ITEM_NAME': 'kitchen table', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'tavolo', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'kitchen-table.png'},{'ITEM_ID': '12', 'ITEM_NAME': 'sink', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'lavello', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'sink.png'},{'ITEM_ID': '13', 'ITEM_NAME': 'knife', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'coltello', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'table-knife.png'},{'ITEM_ID': '14', 'ITEM_NAME': 'spoon', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'cucchiaio', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'table-spoon.jpeg'},{'ITEM_ID': '15', 'ITEM_NAME': 'teaspoon', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'cucchiaino', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'teaspoon.jpg'},{'ITEM_ID': '16', 'ITEM_NAME': 'plate', 'THEMATIC_SET': 'kitchen', 'ART_SINGULAR': 'il', 'IT_SINGULAR': 'piatto', 'ART_PLURAL': '', 'FILE_PATH': '/images/kitchen', 'FILE_NAME': 'plate.jpg'}];


function createCard (it_name, img_src) {

    let temp = document.createElement('div');
    temp.innerHTML = 
        `<div class="card">
            <div class="card-image-container">
                <img src="${img_src}">
            </div>
            <div class="card-label-container">
                <div class="card-label"><span>${it_name}</span></div>
            </div>
        </div>`

    card_element = temp.querySelector('div.card');

    return card_element;
}


function loadCards (thematicSet) {

    // Get current thematic set data
    //const thematicSet = document.querySelector('select#select-context').value;
    const current_dataset = dataset_JSON.filter(item => item["THEMATIC_SET"] == thematicSet);

    // Clear cards container
    const cardsContainer = document.querySelector('div#cards-container');
    cardsContainer.innerHTML = '';

    for (const item of current_dataset) {

        // Create and insert card element
        const it_name = item["ART_SINGULAR"] + ' ' + item["IT_SINGULAR"];
        const img_src = './' + item["FILE_PATH"] + '/' + item["FILE_NAME"];
        card_element = createCard (it_name, img_src);
        cardsContainer.insertAdjacentElement('afterBegin', card_element);

        // Add function to toggle label visibility
        card_image = card_element.querySelector('.card-image-container');
        card_image.setAttribute('data-clicked', 0);

        card_image.addEventListener('click', function () {

            const cardLabel = this.parentElement.querySelector('.card-label-container');
            const click_state = Number(this.getAttribute('data-clicked'));

            switch (click_state) {
                case 0:
                    cardLabel.style.visibility = 'visible';
                    this.setAttribute('data-clicked', 1);
                    break;

                case 1:
                    cardLabel.style.visibility = 'hidden';
                    this.setAttribute('data-clicked', 0);
                    break;
            }
        });

        // Change visibility on hover (overrides CSS settings)
        card_image.addEventListener('mouseover', function () {
            const cardLabel = this.parentElement.querySelector('.card-label-container');
            cardLabel.style.visibility = 'visible';
        });

        card_image.addEventListener('mouseout', function () {
            const cardLabel = this.parentElement.querySelector('.card-label-container');
            const click_state = Number(this.getAttribute('data-clicked'));
            if (click_state == 0) {
                cardLabel.style.visibility = 'hidden';
            };
        });

    }

}




/* * * Create custom select * * */

function createCustomSelect (selectId, inputLabel, optionsList = [], callBackFn = null) {

    /* Create template for custom select element */

    temp = document.createElement('div');
    temp.innerHTML = 
    `<div id="${selectId}" class="custom-select">
        <div class="select-input" tabindex="0" data-clicked="0">
            <div class="select-label">${inputLabel}</div>
            <div class="select-arrow">
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </div>

        <div class="select-items" tabindex="0"></div>
    </div>
    `;

    customSelect = temp.querySelector('.custom-select');
    selectInput = customSelect.querySelector('.select-input');
    itemsList = customSelect.querySelector('.select-items');

    /* Add options */

    for (arr of optionsList) {
        temp = document.createElement('div');
        temp.innerHTML = `<option value="${arr[0]}" selected>${arr[1]}</option>`;
        option = temp.querySelector('option');
        itemsList.insertAdjacentElement('beforeEnd', option);
    }


    /* * * Add Event Listners   * *  */
    
    /* Open/close select list on click */
    selectInput.addEventListener('click', function () {
        let isClicked = Number(this.getAttribute('data-clicked'));
        isClicked = isClicked == 0 ? 1 : 0;
        this.setAttribute('data-clicked', isClicked);
    });
    
    /* Close list when user clicks outside */
    document.addEventListener('click', e => {
        element = selectInput;
        if (!element.contains(e.target)) {
            element.setAttribute('data-clicked', 0);
        };
    });

    /* Select option from the list */
    itemsList.querySelectorAll('option').forEach(
        option => option.addEventListener('click', function () {
            /* Set label to selected option */
            selectLabel = this.parentElement.parentElement.querySelector('.select-input > .select-label');
            selectLabel.textContent = this.textContent;

            /* Callback function that executes after selecting an option */
            callBackFn(this.value);

            /* Format selected option */
            this.parentElement.querySelectorAll('option').forEach(option => option.style.backgroundColor = 'unset');
            this.style.backgroundColor = 'pink';
        })
    );
    

    /* End */
    return customSelect;

}
