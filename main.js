// Get the dialog element and buttons
const searchDialog = document.getElementById('search-dialog');
const searchButton = document.querySelector('.search-button'); // Use class selector
const closeSearchButton = document.getElementById('close-search');

// Open the dialog when the search button is clicked
searchButton.addEventListener('click', () => {
    searchDialog.showModal();
});

// Close the dialog when the close button is clicked
closeSearchButton.addEventListener('click', () => {
    searchDialog.close();
});