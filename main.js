// Get all the buttons inside side-content
const sideButtons = document.querySelectorAll('.side-content button');
const topButtons = document.querySelectorAll('.top-content button');
const homeButton = document.querySelector('.home-button');
const booksContainer = document.querySelector('.books-container');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('form');
const closeBtn = document.querySelector('#close-btn');
const openModelBtn = document.querySelector('.add-button');
const addBookBtn = document.querySelector('#add-book-button');
const favoriteBook = document.querySelector('.favorite-btn');
const favoritesButton = document.getElementById('favorites');
const trendingButton = document.getElementById('trending');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const bookSummary = document.querySelector('#book-summary');
const removeButton = document.querySelector('.remove-button');
const uploadButton = document.getElementById('file-button');
const imageInput = document.getElementById('images');
const imageTitle = document.getElementById('image-title');
const imageContainer = document.querySelector('.image-upload-container')


function setActiveButton() {
    // Get the current page URL
    const currentPage = window.location.href;
    
    // Remove active class from all buttons first
    sideButtons.forEach(button => {
        button.classList.remove('active');
    });
    topButtons.forEach(button => {
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
topButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        topButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the clicked button
        this.classList.add('active');
    });
});


const myLibrary = [];

addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true, 'https://m.media-amazon.com/images/I/811t1pfIZXL._AC_UF1000,1000_QL80_.jpg');
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true, 'https://images.booksense.com/images/866/064/9780439064866.jpg');
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true, 'https://images.booksense.com/images/595/139/9780439139595.jpg');
addBookToLibrary('Harry Potter', 'J.K.Rowling', 750, 'Througly enjoyed reading this book, its really fantastic!', true, 'https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF894,1000_QL80_.jpg');


myLibrary.forEach(item => item.populate());

addBookBtn.addEventListener("click", e => {
  e.preventDefault();
  
  if (!bookTitle.value || !bookAuthor.value) {
    alert("Please fill out all required fields.");
    return; // Stop execution if fields are not filled
  }
  
  const bookIsRead = document.querySelector('input[type="checkbox"]').checked ? true : false;
  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookSummary.value, bookIsRead, imageUrl);
  myLibrary[myLibrary.length - 1].populate();
  overlay.style.display = 'none';
})

overlay.style.display = "none";

openModelBtn.addEventListener("click", e => {
  if(overlay.style.display === "none"){
    overlay.style.display = "block";
  }
  else {
    overlay.style.display = "none"
  }
})
closeBtn.addEventListener("click", e => {
  overlay.style.display = "none";
})


function addBookToLibrary(title, author, pages, summary, isRead, imageInput) {
  const newBook = new Book(title, author, pages, summary, isRead, imageInput)
  myLibrary.push(newBook);
  return;
}

removeButton.addEventListener("click", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach( btn => {
    if(btn.style.display === "none"){
      btn.style.display = "block";
    }
    else {
      btn.style.display = "none"
    }
  })
});

uploadButton.addEventListener("click", (e) => {
  imageInput.click();
})

let imageUrl = "";
imageInput.addEventListener("change", () => {
  imageUrl = URL.createObjectURL(imageInput.files[0]);
  imageTitle.textContent = "Image Selected"
})


function Book(title, author, pages, summary, isRead, imageUrl){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.summary = summary;
  this.isRead = isRead;
  this.imageUrl = imageUrl;
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

      <div class="image-upload-container" style ="background-image:url(${this.imageUrl}">

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
          readStatus.innerHTML = `<strong>Finished:</strong> Yes`
        });
      }
    
      const deleteBtn = card.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", e => {
        const card = e.target.closest(".card");
        if (card){
          card.remove();
        }
      })

  }
}