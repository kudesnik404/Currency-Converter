window.addEventListener('load', () => {

const currencyButtonInput = document.querySelectorAll('.card1 button, .card1 select');
const currencyButtonOutput = document.querySelectorAll('.card2 button, .card2 select');
const input = document.querySelector('.card1 input');
const output = document.querySelector('.card2 input');

currencyButtonInput.forEach((element) => {
    element.addEventListener('click', () => {
        currencyButtonInput.forEach((elem) => {
            elem.classList.remove('selected');
        })
        element.classList.add('selected');
    })
    element.addEventListener('click', checkCurrencyfor1);
})
currencyButtonOutput.forEach((element) => {
    element.addEventListener('click', () => {
        currencyButtonOutput.forEach((elem) => {
            elem.classList.remove('selected');
        })
        element.classList.add('selected');
    })
    element.addEventListener('click', checkCurrencyfor2);
})
    
function checkCurrencyfor1() {
    let amount1 = document.querySelector('.card1 input');
    let amount2 = document.querySelector('.card2 input');
    let selectedCurrency1 = document.querySelector('.card1 .selected');
    if (selectedCurrency1.innerHTML.length == 3) {
        selectedCurrency1 = selectedCurrency1.innerHTML;
    } else {
        selectedCurrency1 = selectedCurrency1.value;
    }
    let selectedCurrency2 = document.querySelector('.card2 .selected');
    if (selectedCurrency2.innerHTML.length == 3) {
        selectedCurrency2 = selectedCurrency2.innerHTML;
    } else {
        selectedCurrency2 = selectedCurrency2.value;
    }
    if (selectedCurrency1 == selectedCurrency2) {
        amount1.value = amount2.value;
    }
    askServer2
}
function checkCurrencyfor2() {
    let amount1 = document.querySelector('.card1 input');
    let amount2 = document.querySelector('.card2 input');
    let selectedCurrency1 = document.querySelector('.card1 .selected');
    if (selectedCurrency1.innerHTML.length == 3) {
        selectedCurrency1 = selectedCurrency1.innerHTML;
    } else {
        selectedCurrency1 = selectedCurrency1.value;
    }
    let selectedCurrency2 = document.querySelector('.card2 .selected');
    if (selectedCurrency2.innerHTML.length == 3) {
        selectedCurrency2 = selectedCurrency2.innerHTML;
    } else {
        selectedCurrency2 = selectedCurrency2.value;
    }
    if (selectedCurrency1 == selectedCurrency2) {
        amount2.value = amount1.value;
    }
    askServer1
}

input.addEventListener('keyup', askServer1);
output.addEventListener('keyup', askServer2);

function askServer1() {
    let amount1 = document.querySelector('.card1 input');
    let amount2 = document.querySelector('.card2 input');
    let selectedCurrency1 = document.querySelector('.card1 .selected');
    if (selectedCurrency1.innerHTML.length == 3) {
        selectedCurrency1 = selectedCurrency1.innerHTML;
    } else {
        selectedCurrency1 = selectedCurrency1.value;
    }
    let selectedCurrency2 = document.querySelector('.card2 .selected');
    if (selectedCurrency2.innerHTML.length == 3) {
        selectedCurrency2 = selectedCurrency2.innerHTML;
    } else {
        selectedCurrency2 = selectedCurrency2.value;
    }

    if (selectedCurrency1 == selectedCurrency2) {   
        amount2.value = amount1.value;
    } else {
        fetch(`https://api.exchangerate.host/convert?from=${selectedCurrency1}&to=${selectedCurrency2}&amount=${amount1.value}`)
            .then ((res) => {
                return res.json()
            })
            .then ((data) => {
                console.log(data);
            })
            .catch ((err) => {
                console.log(err)
            })
    }
}
function askServer2() {
    let amount1 = document.querySelector('.card1 input');
    let amount2 = document.querySelector('.card2 input');

    let selectedCurrency1 = document.querySelector('.card1 .selected');
    if (selectedCurrency1.innerHTML.length == 3) {
        selectedCurrency1 = selectedCurrency1.innerHTML;
    } else {
        selectedCurrency1 = selectedCurrency1.value;
    }
    let selectedCurrency2 = document.querySelector('.card2 .selected');
    if (selectedCurrency2.innerHTML.length == 3) {
        selectedCurrency2 = selectedCurrency2.innerHTML;
    } else {
        selectedCurrency2 = selectedCurrency2.value;
    };

    if (selectedCurrency1 == selectedCurrency2) {   
        amount1.value = amount2.value;
    } else {
        fetch(`https://api.exchangerate.host/convert?from=${selectedCurrency2}&to=${selectedCurrency1}&amount=${amount2.value}`)
            .then ((res) => {
                return res.json()
            })
            .then ((data) => {
                console.log(data);
            })
            .catch ((err) => {
                console.log(err)
            })
        }
}


















































})