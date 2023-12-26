const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = ' NOT OK'
        phoneResult.style.color = 'red'
    }
})

 const tabsContentCards = document.querySelectorAll('.tab_content_block')
const tabsItems = document.querySelectorAll('.tab_content_item')
const tabsItemsParent = document.querySelector('.tab_content_items')
let currentTab = 0


const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active')
    })
}


const showTabsContentCards = (indexElement = 0) => {
    tabsContentCards[indexElement].style.display = 'block'
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

const switchTab = () => {
   hideTabsContentCards()
   currentTab = (currentTab +1) % tabsItems.length
   showTabsContentCards(currentTab)
}

hideTabsContentCards()
showTabsContentCards()
setInterval(switchTab, 3000)

tabsItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabsItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hideTabsContentCards()
                currentTab = tabItemIndex
                showTabsContentCards(currentTab)
            }
        })
    }
}

// CONVERTER


const converter = (element, targetElement, type, targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);
            switch (type) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    targetElement2.value = (element.value / data.eur).toFixed(2);
                    break;
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2);
                    targetElement2.value = (element.value * data.usd).toFixed(2);

                    break;
                default:
                    break;
            }
            element.value === '' && (targetElement.value = '');
            element.value === '' && (targetElement2.value = '');
        };
    };
};

const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

converter(somInput, usdInput, 'som' , eurInput);
converter(usdInput, somInput, 'usd' , eurInput);
converter(eurInput, usdInput, 'eur' , somInput);



const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')





const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
cityNameInput.oninput = (event) => {
    fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data?.name ? data?.name : 'Город не найден...'
            temp.innerHTML = data.main ?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
        })
}



const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 200;

const fetchCard = () => {
    if (count === 0) {
        count = 200;
    } else if (count === 201) {
        count = 1;
    }

    fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
        .then(response => response.json())
        .then(data =>{
            card.innerHTML = `
            <p>${data.title}<p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
            `;
        });
};

fetchCard(); // Fetch the initial card with count = 200

btnNext.onclick = () => {
    count++;
    fetchCard();
};

btnPrev.onclick = () => {
    count--;
    fetchCard();
};





