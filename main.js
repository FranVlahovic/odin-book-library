// Get all the buttons inside side-content
const sideButtons = document.querySelectorAll('.side-content button');
const homeButton = document.querySelector('.home-button');

function setActiveButton() {
    // Get the current page URL
    const currentPage = window.location.href;
    
    // Remove active class from all buttons first
    sideButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Apply the active class based on the current URL
    if (currentPage.includes('index.html')) {
        homeButton.classList.add('active');
    } else if (currentPage.includes('trending.html')) {
        document.querySelector('.trending-button').classList.add('active');
    } else if (currentPage.includes('favorites.html')) {
        document.querySelector('.favorites-button').classList.add('active');
    }
}

// Call setActiveButton on page load
setActiveButton();

// Function to handle the active state
sideButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        sideButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        this.classList.add('active');
    });
});


const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.populate = function(){

  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead)
  myLibrary.push(newBook);
  return
}
