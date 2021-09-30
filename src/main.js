window.addEventListener('load', () => {

const currencyButtonInput = document.querySelectorAll('.card1 button, .card1 select');
const currencyButtonOutput = document.querySelectorAll('.card2 button, .card2 select');
const input = document.querySelector('.card1 input');
const output = document.querySelector('.card2 .output');
const inputInfo = document.querySelector('.card1 .inputinfo');
const outputInfo = document.querySelector('.card2 .outputinfo');
const convertButton = document.querySelector('.cards img');

askServer()

currencyButtonInput.forEach((element) => {
    element.addEventListener('click', () => {
        currencyButtonInput.forEach((elem) => {
            elem.classList.remove('selected');
        })
        element.classList.add('selected');
    })
    element.addEventListener('click', askServer);
})
currencyButtonOutput.forEach((element) => {
    element.addEventListener('click', () => {
        currencyButtonOutput.forEach((elem) => {
            elem.classList.remove('selected');
        })
        element.classList.add('selected');
    })
    element.addEventListener('click', askServer);
})

input.addEventListener('keyup', askServer);
convertButton.addEventListener('click', changePlaces);

function askServer() {
    input.value = input.value.replace((/\s/g), '');
    
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
       output.value = input.value;
       inputInfo.innerHTML = `${input.value} ${selectedCurrency1} = ${output.value} ${selectedCurrency2}`;
       outputInfo.innerHTML = inputInfo.innerHTML;

    } else {
        if (isNaN(+(input.value.replace((/,/g), '.')))) {
            input.value = 'не число';
            output.value = '';
            inputInfo.innerHTML = "";
            outputInfo.innerHTML = "";
        } else {   
            if (/(,|\.)$/.test(input.value)) {
                return
            }
            fetch(`https://api.exchangerate.host/convert?from=${selectedCurrency1}&to=${selectedCurrency2}&amount=${(input.value.replace((/,/g), '.'))}`)
                .then ((res) => {
                    return res.json()
                })
                .then ((data) => {
                    output.value = data.result;
                    output.value = new Intl.NumberFormat().format(output.value);
                    input.value = new Intl.NumberFormat().format((input.value.replace((/,/g), '.')));
                })
                .catch ((err) => {
                    console.log(err)
                })
            fetch(`https://api.exchangerate.host/convert?from=${selectedCurrency1}&to=${selectedCurrency2}&amount=1`)
                .then ((res) => {
                    return res.json()
                })
                .then ((data) => {
                    inputInfo.innerHTML = `1 ${selectedCurrency1} = ${Math.round(parseFloat(data.result) * 10000) / 10000} ${selectedCurrency2}`;
                    outputInfo.innerHTML = `1 ${selectedCurrency2} = ${Math.round(parseFloat(1 / data.result) * 10000) / 10000} ${selectedCurrency1}`;
                })
                .catch ((err) => {
                    console.log(err)
                })
        }
    }
}

function changePlaces() {
    let selCur1 = document.querySelector('.card1 .selected');
    let selCur2 = document.querySelector('.card2 .selected');

    if (selCur1.innerHTML.length == 3) {
        selCur1 = selCur1.innerHTML;
    } else {
        selCur1 = selCur1.value;
    }
    if (selCur2.innerHTML.length == 3) {
        selCur2 = selCur2.innerHTML;
    } else {
        selCur2 = selCur2.value;
    }

    currencyButtonInput.forEach((element) => {
        element.classList.remove('selected');
        if (element.innerHTML == selCur2) {
            element.classList.add('selected');
            askServer()  
        } else if (element.value == selCur2) {
            element.classList.add('selected')
            askServer()
        } else {
            element.classList.remove('selected');
        }
    })
    currencyButtonOutput.forEach((element) => {
        element.classList.remove('selected');
        if (element.innerHTML == selCur1) {
            element.classList.add('selected');
            askServer()  
        } else if (element.value == selCur1) {
            element.classList.add('selected')
            askServer()
        } else {
            element.classList.remove('selected');
        }
    })
}

})