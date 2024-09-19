// Fetch data from the API and display it on the webpage
async function fetchCryptoData() {
    try {
        // Fetch data from your Express endpoint
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false');
        const data = await response.json(); // Parse the JSON response
        displayData(data); // Call function to display data

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('crypto-data').innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

// Function to display data on the webpage
function displayData(coins) {
    const container = document.getElementById('crypto-data');
    container.innerHTML = ''; // Clear existing content

    // Loop through the coins and create HTML for each coin
    coins.forEach(coin => {
        const coinDiv = document.createElement('div');
        coinDiv.classList.add('coin');
        coinDiv.innerHTML = `
            <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
            <img src="${coin.image}" alt="${coin.name} logo" />
            <p>Current Price: $${coin.current_price}</p>
            <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
            <p>Highest 24h: $${coin.high_24h}</p>
            <p>Lowest 24h: $${coin.low_24h}</p>
            <p>Price change 24h: $${coin.price_change_24h}</p>  
        `;
        container.appendChild(coinDiv); // Append the newly created div to the container
    });
}

// Call the function to fetch and display data when the page loads
fetchCryptoData();
