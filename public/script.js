// Fetch data from the API and display it on the webpage
async function fetchCryptoData() {
    try {
        // Fetch data from your Express endpoint
        const response = await fetch('http://your-backend-domain.com/coins'); 
        const data = await response.json(); // Parse the JSON response
        cryptoData = data;
        displayData(data); // Call function to display data

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('crypto-data').innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

// Function to display data on the webpage
function displayData(coins) {
    const container = document.getElementById('data');
    container.innerHTML = ''; // Clear existing content

    // Loop through the coins and create HTML for each coin
    coins.forEach(coin => {
        const row  = document.createElement('tr');
        //coinDiv.classList.add('coin');
        row.innerHTML = `
            <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
            <td><img src="${coin.image}" alt="${coin.name} logo" width="30" height="30"></td>
            <td>$${coin.current_price}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
            <td>$${coin.high_24h}</td>
            <td>$${coin.low_24h}</td>
            <td>$${coin.price_change_24h}</td>  
        `;
        container.appendChild(row); // Append the newly created div to the container
    });
}

function filterData() {
    const searchInput = document.getElementById('filter').value.toLowerCase(); // Get search input and convert to lowercase
    const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchInput) || 
        coin.symbol.toLowerCase().includes(searchInput)
    ); // Filter coins by name or symbol
    displayData(filteredData); // Display filtered data in the table
}


document.getElementById('filter').addEventListener('keyup', filterData);

// Call the function to fetch and display data when the page loads
fetchCryptoData();
