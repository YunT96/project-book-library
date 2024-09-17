document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.querySelector("dialog");
  const showButton = document.querySelector("#show-form-btn");
  const closeButton = document.querySelector("#close-form-btn");
  const submitButton = document.querySelector("#submit-btn");

  let bookCounter = 0;

  // "Show the dialog" button opens the dialog modally
  showButton.addEventListener("click", () => {
    dialog.showModal();
  });

  // "Close" button closes the dialog
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  //submit button
  submitButton.addEventListener("click", () => {
    // Check if all fields are valid
    if (!validateForm()) {
      return; // Stop the function if validation fails
    }

    const book = document.getElementById("book-name").value;
    const author = document.getElementById("author-name").value;
    const pages = document.getElementById("book-pages").value;
    const read = document.getElementById("read-check").checked;

    const newBook = new Book(book, author, pages, read);
    newBook.id = bookCounter++;
    myLibrary.push(newBook);

    addBookToLibrary();
    console.table(myLibrary);

    // Reset form fields
    document.getElementById("book-name").value = "";
    document.getElementById("author-name").value = "";
    document.getElementById("book-pages").value = "";
    document.getElementById("read-check").checked = false;

    // Optionally close the dialog after submission
    dialog.close();
  });

  const myLibrary = [];

  class Book {
    constructor(name, author, pages, read) {
      this.book = name;
      this.author = author;
      this.pages = pages;
      this.hasRead = read;
      this.id = null;
    }

    toggleRead() {
      this.hasRead = !this.hasRead;
    }
  }

  function addBookToLibrary() {
    const container = document.querySelector(".gallery");
    container.innerHTML = "";

    myLibrary.forEach((book) => {
      const card = document.createElement("div");
      card.classList.add("box");

      const titlePara = document.createElement("p");
      titlePara.textContent = `Title: ${book.book}`;

      const authorPara = document.createElement("p");
      authorPara.textContent = `Author: ${book.author}`;

      const pagesPara = document.createElement("p");
      pagesPara.textContent = `Pages: ${book.pages}`;

      const readContainer = document.createElement("div");
      readContainer.style.display = "flex";
      readContainer.style.alignItems = "center";
      readContainer.style.gap = "8px";

      const readPara = document.createElement("p");
      readPara.textContent = `Has read: `;

      const readCheckbox = document.createElement("input");
      readCheckbox.type = "checkbox";
      readCheckbox.checked = book.hasRead;

      readCheckbox.addEventListener("change", function () {
        book.toggleRead();
        console.log(`Read status for "${book.book}" is now: ${book.hasRead}`);
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "delete";
      deleteButton.setAttribute("data-id", book.id);
      deleteButton.addEventListener("click", (event) => {
        deleteBook(event.target);
      });

      card.appendChild(titlePara);
      card.appendChild(authorPara);
      card.appendChild(pagesPara);
      card.appendChild(readContainer);
      readContainer.appendChild(readPara);
      readContainer.appendChild(readCheckbox);
      card.appendChild(deleteButton);

      container.appendChild(card);
      console.log("called");
    });
  }

  function deleteBook(button) {
    const idToDelete = button.getAttribute("data-id");
    const indexToDelete = myLibrary.findIndex((book) => book.id == idToDelete);
    if (indexToDelete !== -1) {
      myLibrary.splice(indexToDelete, 1);
      addBookToLibrary();
      console.table(myLibrary);
    }
  }

  // Function to validate form fields
  function validateForm() {
    const book = document.getElementById("book-name").value.trim();
    const author = document.getElementById("author-name").value.trim();
    const pages = document.getElementById("book-pages").value.trim();

    if (book === "" || author === "" || pages === "") {
      alert("Please fill out all fields.");
      return false; // Validation failed
    }

    if (isNaN(pages) || parseInt(pages) <= 0) {
      alert("Please enter a valid number of pages.");
      return false;
    }

    return true; // Validation passed
  }

  //default placeholder books for testing
  // myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
  // myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
  // myLibrary.push(new Book("1984", "George Orwell", 328, true));

  addBookToLibrary();
  console.log("DOM fully loaded and parsed");
});
