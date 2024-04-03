const mySelectFrom: HTMLSelectElement = document.getElementById("curr_from") as HTMLSelectElement;
const mySelectTo: HTMLSelectElement = document.getElementById("curr_to") as HTMLSelectElement;
const mySelectToSec: HTMLSelectElement = document.getElementById("curr_to_sec") as HTMLSelectElement;
const optionalSelect: HTMLSelectElement = document.getElementById("optional_dropdown") as HTMLSelectElement;
const optional_amount: HTMLElement = document.getElementById("optional_amount") as HTMLElement;

async function fetchDataWithErrors() {
    try {
        const response: Response = await fetch('https://openexchangerates.org/api/latest.json?app_id=cd24bc83a444456e9966b810fc9ce7ca');
        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status + " Please check your link from where you are trying to fetch some data");
        }
        const data: any = await response.json();
        for (let x in data.rates) {
            let opt: HTMLOptionElement = document.createElement('option');
            opt.value = data.rates[x];
            opt.innerHTML = x;
            mySelectFrom.appendChild(opt);
        }
        for (let x in data.rates) {
            let opt: HTMLOptionElement = document.createElement('option');
            opt.value = data.rates[x];
            opt.innerHTML = x;
            mySelectTo.appendChild(opt);
        }
        for (let x in data.rates) {
            let opt: HTMLOptionElement = document.createElement('option');
            opt.value = data.rates[x];
            opt.innerHTML = x;
            mySelectToSec.appendChild(opt);
        }
    } catch (error) {
        document.getElementById("body")!.innerText = error.message;
    }
}

let no_Conversion: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[name='select_conver']") as NodeListOf<HTMLInputElement>;
let selected_one: HTMLInputElement;

no_Conversion.forEach(selected => selected.addEventListener("change", () => {
    selected_one = document.querySelector("input[name='select_conver']:checked") as HTMLInputElement;
    if (selected_one.value === "multiple") {
        optionalSelect.style.display = "block";
    } else {
        optionalSelect.style.display = "none";
        optional_amount.style.display = "none";
    }
}));
let from: string, to: string, more: string;
const handleChangeAmount = () => {
    let currAmount: HTMLInputElement = document.getElementById("amountcon") as HTMLInputElement;
    let amount: HTMLElement = document.getElementById("aamount") as HTMLElement;
    let validateText: HTMLElement = document.getElementById("validateText") as HTMLElement;
    if (!currAmount.value || !mySelectFrom.value || !mySelectTo.value) {
        validateText.style.display = "block";
        setTimeout(() => validateText.style.display = "none", 2000);
    } else if (mySelectFrom.value === mySelectTo.value || mySelectFrom.value === mySelectToSec.value || mySelectTo.value === mySelectToSec.value) {
        validateText.style.display = "block";
        validateText.innerText = "converting currency cannot be same";
        setTimeout(() => validateText.style.display = "none", 2000);
    } else {
        
        Object.values(mySelectFrom.options).forEach(function (option) {
            if (option.value === mySelectFrom.value) from = option.text;
        });
        Object.values(mySelectTo.options).forEach(function (option) {
            if (option.value === mySelectTo.value) to = option.text;
        });
        Object.values(mySelectToSec.options).forEach(function (option) {
            if (option.value === mySelectToSec.value) more = option.text;
        });
        amount.innerText = `${from} to ${to} ${(parseFloat(currAmount.value) * parseFloat(mySelectTo.value)) / parseFloat(mySelectFrom.value)}`;
        if (selected_one.value === "multiple") {
            optional_amount.style.display = "block";
            optional_amount.innerText = `${from} to ${more} ${(parseFloat(currAmount.value) * parseFloat(mySelectToSec.value)) / parseFloat(mySelectFrom.value)}`;
        }
        currAmount.innerText = "";
    }
}

fetchDataWithErrors();
