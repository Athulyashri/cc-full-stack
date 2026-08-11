// Get all the required DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const conversionText = document.getElementById('conversion-text');
const rateText = document.getElementById('rate-text');

// This function is marked 'async' because we are making a network request
// and we need to 'await' for the response to come back over the internet.
async function convertCurrency() {
    // Get the current values from the input fields
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // 1. Input Validation
    // Check if the user entered an empty value or a negative/zero amount
    if (amount === '' || amount <= 0) {
        conversionText.textContent = 'Please enter a valid positive amount';
        conversionText.classList.add('error');
        rateText.textContent = '';
        return; // Stop the function here
    }
    
    // Clear any previous error styling and show a loading message
    conversionText.classList.remove('error');
    conversionText.textContent = 'Converting...';
    rateText.textContent = '';

    try {
        // 2. REST API
        // A REST API (Representational State Transfer) is a way for programs to talk to each other over the internet.
        // We are constructing a URL to ask this specific service for the latest exchange rates for our 'from' currency.
        const apiUrl = `https://open.er-api.com/v6/latest/${from}`;

        // 3. fetch() and GET request
        // The fetch() function is built into JavaScript. It makes a network request.
        // By default, it makes a "GET" request, which means we are just asking for data to "get" or read, not sending data to save.
        const response = await fetch(apiUrl);

        // 4. API Error Handling
        // We check if the response status is "ok" (status code 200-299). If not, we throw an error.
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        // 5. Parse JSON
        // JSON (JavaScript Object Notation) is a standard text format for representing structured data.
        // The API sends data back as text in JSON format. The .json() method parses this text into a usable JavaScript object.
        const data = await response.json();

        // 6. Accessing the parsed JSON data
        // The API returns an object with a "rates" property, which itself is an object containing all currency rates.
        const exchangeRate = data.rates[to];
        
        if (!exchangeRate) {
            throw new Error(`Currency ${to} not found in response`);
        }

        // Calculate the final converted amount
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        // 7. Display the result on the webpage
        conversionText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        rateText.textContent = `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;

    } catch (error) {
        // This catch block will run if ANYTHING goes wrong in the 'try' block above (e.g. no internet connection).
        console.error('Error fetching conversion rates:', error);
        conversionText.textContent = 'Failed to fetch conversion rates.';
        conversionText.classList.add('error');
        rateText.textContent = 'Please check your internet connection or try again later.';
    }
}

// Add an event listener to run our convert function when the button is clicked
convertBtn.addEventListener('click', convertCurrency);

// Add functionality for the swap button
swapBtn.addEventListener('click', () => {
    // Swap the values of the dropdowns
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    // Automatically run the conversion again if there's already an amount entered
    if (amountInput.value) {
        convertCurrency();
    }
});
