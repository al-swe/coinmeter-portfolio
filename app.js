// Button jump function
let joinButton = document.getElementById('joinButton');

joinButton.addEventListener('click', function() {
    let targetUrl = '#join';
    window.location.href = targetUrl;
});

// List population and refresh
const resultList = document.getElementById("resultList");

function timer() {
    let timeLeft = 9;
    let timer = setInterval(function(){
        if(timeLeft <= 0){
            clearInterval(timer);
        }
    }, 1000);
}


async function getData() {
    const api = "https://api.coincap.io/v2/assets?limit=20";
    const response = await (await fetch(api)).json();
    const data = response.data;
    resultList.innerHTML = "";

    for (const coin in data) {
        const language = "en";
        const numberMktCap = parseFloat(data[coin].marketCapUsd);
        const marketCap = Intl.NumberFormat(language, {notation: "compact"}).format(numberMktCap);
        const numberVol = parseFloat(data[coin].volumeUsd24Hr);
        const volume = Intl.NumberFormat(language, {notation: "compact"}).format(numberVol);

        const change = data[coin].changePercent24Hr;
        let color;

        if (change <= 0) {
            color = "red";
        } else if (change > 0) {
            color = "green";
        }

        resultList.innerHTML += `
        <tr>
            <td><img src="https://assets.coincap.io/assets/icons/${data[coin].symbol.toLowerCase()}@2x.png" alt="${data[coin].name} icon." class="coin-icon"></td>
            <td class="symbol-list">${data[coin].symbol}</td>
            <td><p>${data[coin].name}</p></td>
            <td class="text-right">$${parseFloat(data[coin].priceUsd).toFixed(2)}</td>
            <td class="text-right market-cap-list">$${marketCap}</td>
            <td class="text-right">$${volume}</td>
            <td class="text-right ${color}">${parseFloat(change).toFixed(2)}</td>
        </tr>
        `;
    }
}

function run() {
    getData()
    timer()
    setInterval(() => {
        getData()
        timer()
    }, 10000);
}

run()

// Form functionality
const formBtn = document.getElementById("formBtn");
const formInput = document.getElementById("formInput");
const confirmText = document.getElementById("confirmText");

formBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const enteredText = formInput.value;

    if (enteredText === "") {
        formInput.classList.add("red-outline");
    } else if (!isValidEmail(enteredText)) {
        formInput.classList.add("red-outline");
    } else {
        formInput.classList.remove("red-outline");
        confirmText.style.display = "block";
        setTimeout(() => {
            confirmText.classList.remove("hidden");
        }, 500);
        formInput.value = "";
        formInput.disabled = true;
        formInput.classList.add("disabled-cursor");
        formBtn.disabled = true;
        formBtn.classList.add("disabled-cursor");
        formBtn.style.opacity = "0.5";

        // Remove hover effect by adding a class
        formBtn.classList.add("no-hover-effect");
    }
});

function isValidEmail(email) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
