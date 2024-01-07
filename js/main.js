var bookName = document.getElementById("bookName");
var bookUrl = document.getElementById("bookUrl");
var submitBtn = document.getElementById("submitBtn");

var errorBox = document.getElementById("errorBox");
var errorBoxCloseBtn = document.getElementById("closeBtn");

// Validation of the user input
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

if (localStorage.getItem("bookList") == null) {
  // list for adding the the
  var bookList = [];
} else {
  bookList = JSON.parse(localStorage.getItem("bookList"));
  displayBook(bookList);
}

// this function is for adding the item from the input form ui to the book list as an object
function addBook() {
  // Trim values to remove leading and trailing whitespaces
  var bookNameValue = bookName.value.trim();
  var bookUrlValue = bookUrl.value.trim();

  // Validate book name and URL
  if (nameRegex.test(bookNameValue) && urlRegex.test(bookUrlValue)) {
    var book = {
      name: bookNameValue,
      url: bookUrlValue,
    };

    // Add the book to the list
    bookList.push(book);
    console.log(bookList);

    displayBook(bookList);
    localStorage.setItem("bookList", JSON.stringify(bookList));

    // function to cleat input form the html after add the product ot the list ;
    clearInput();
  } else {
    showErrorBox();
  }
}

submitBtn.addEventListener("click", addBook);

bookName.addEventListener("input", function () {
  validate(bookName, nameRegex);
});

bookUrl.addEventListener("input", function () {
  validate(bookUrl, urlRegex);
});

function validate(element, regex) {
  var textRegex = regex;
  if (textRegex.test(element.value)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

// function for deleting the input from the elements from html
function clearInput() {
  bookName.value = "";
  bookUrl.value = "";
}

// this function for display data as a row in the table body
function displayBook(books) {
  var itemHolder = ``;
  for (var i = 0; i < books.length; i++) {
    itemHolder += `<tr>
          <td>${i + 1}</td>
          <td>${books[i].name}</td>
          <td>${books[i].url}</td>              
          <td>
            <button onclick="visit(${i})" class="btn visit-btn" data-index="${i}">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </td>
          <td>
            <button onclick="deleteBook(${i})" class="btn delete-btn pe-2" data-index="${i}">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
      </tr>`;
  }

  document.getElementById("tbody").innerHTML = itemHolder;
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("bookList", JSON.stringify(bookList));
  displayBook(bookList);
}

function showErrorBox() {
  var errorBox = document.getElementById("errorBox");
  errorBox.classList.remove("d-none");
}

//
function hideErrorBox() {
  var errorBox = document.getElementById("errorBox");
  errorBox.classList.add("d-none");
}

// Function to close the error box
function closeErrorBox(event) {
  errorBoxCloseBtn.addEventListener("click", function () {
    errorBox.classList.add("d-none");
    if (!boxContent.contains(event.target)) {
      errorBox.classList.add("d-none");
  }
  });
}



// function closeErrorBox() {
//   var errorBox = document.getElementById("errorBox");
//   var boxContent = document.getElementById("boxContent");

//   // Add click event listener to the document
//   document.addEventListener("click", function (event) {
//       // Check if the clicked element is outside the box-content
//       if (!boxContent.contains(event.target)) {
//           errorBox.classList.add("d-none");
//       }
//   });

//   // Add click event listener to the close button
//   document.getElementById("closeBtn").addEventListener("click", function () {
//       errorBox.classList.add("d-none");
//   });
// }

closeErrorBox();