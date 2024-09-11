// Get all the buttons inside side-content
const sideButtons = document.querySelectorAll('.side-content button');
const homeButton = document.querySelector('.home-button');
const booksContainer = document.querySelector('.books-container');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const closeBtn = document.querySelector('#close-btn');
const openModelBtn = document.querySelector('.add-button');
const addBookBtn = document.querySelector('#add-book-button');
const favoriteBook = document.querySelector('.favorite-btn')
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const bookSummary = document.querySelector('#book-summary');
const removeButton = document.querySelector('.remove-button');
const uploadTrigger = document.querySelector('#upload-trigger');
const imageUploadInput = document.querySelector('#image-upload');
const uploadedImage = document.querySelector('#uploaded-image');

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

addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true);


myLibrary.forEach(item => item.populate());

addBookBtn.addEventListener("click", e => {
  e.preventDefault();
  
  if (!bookTitle.value || !bookAuthor.value) {
    alert("Please fill out all required fields.");
    return; // Stop execution if fields are not filled
  }
  
  const bookIsRead = document.querySelector('input[type="checkbox"]').checked ? true : false;
  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookSummary.value, bookIsRead);
  myLibrary[myLibrary.length - 1].populate();
  overlay.style.display = 'none';
})

overlay.style.display = "none";

openModelBtn.addEventListener("click", e => {
  overlay.style.display = "flex";
})
closeBtn.addEventListener("click", e => {
  overlay.style.display = "none";
})


function addBookToLibrary(title, author, pages, summary, isRead) {
  const newBook = new Book(title, author, pages, summary, isRead)
  myLibrary.push(newBook);
  return;
}

uploadTrigger.addEventListener("click", () => {
  imageUploadInput.click();
});

imageUploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file){
    const reader = new FileReader();
    reader.onload = function (e){
      uploadedImage.src = e.target.result;
      uploadedImage.style.display = "block";
      uploadTrigger.style.display = "none";
    }
    reader.readAsDataURL(file);
  }
})

function Book(title, author, pages, summary, isRead){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.summary = summary;
  this.isRead = isRead;
  this.populate = function(){
    const card = document.createElement("div");
    booksContainer.appendChild(card);
    card.setAttribute("class", "card");
    card.setAttribute("id", `card-${myLibrary.indexOf(this)}`);
    card.innerHTML += `
      <div class="remove-card-container">
        <button class="delete-btn">
          <img src="icons/window-close.svg" alt="">
        </button>
      </div>

      <div class="image-upload-container">
      </div>
      
      <div class="favorite-card-container">
        <button class="favorite-btn">
          <img src="" alt="">
        </button>
      </div>

      <div class="info-card-container">
        <p><strong>Title:</strong> ${this.title}</p>
        <p><strong>Author:</strong> ${this.author}</p>
        <p><strong>Pages:</strong> ${this.pages ? this.pages : "N/A"}</p>
        <p id="${myLibrary.indexOf(this)}-stat"><strong>Finished:</strong> ${this.isRead ? "Yes" : '<button class="read-btn"><img src="" alt=""></button>'}</p>
      </div>

      <div class="summary-card-container">
        <p class="summary-title"><strong>Summary:</strong></p>
        <div class="summary-content">
          <p>${this.summary}</p>
        </div>
      </div>`;


    const readBtn = card.querySelector(".read-btn");
    if (readBtn){
      readBtn.addEventListener("click", () => {
        this.isRead = true;
        const readStatus = document.getElementById(`${myLibrary.indexOf(this)}-stat`);
        readStatus.textContent = "Finished: Yes"
      });
    }
   
    
    removeButton.addEventListener("click", () => {
      const deleteButtons = document.querySelectorAll(".delete-btn");
      deleteButtons.forEach(btn => {
        if (btn.style.display === "none" || btn.style.display === ""){
          btn.style.display = "block";
        }
        else {
          btn.style.display = "none";
        }
      });
    });
    
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", e => {
      const card = e.target.closest(".card");
      if (card){
        card.remove();
      }
    })
  }
}