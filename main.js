document.addEventListener('DOMContentLoaded', function () {

    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("#show-form-btn");
    const closeButton = document.querySelector("#close-form-btn");
    const submitButton = document.querySelector("#submit-btn");


    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    submitButton.addEventListener("click", () => {
        const book = document.getElementById("book-name").value;
        const author = document.getElementById("author-name").value;
        const pages = document.getElementById("book-pages").value;
        const read = document.getElementById("read-check").value;

        const newBook = new Book(book, author, pages, read);
        myLibrary.push(newBook);

        console.table(myLibrary);

        //testing
        // Create a new div element
        const newBox = document.createElement('div');

        // Add the 'box' class to the new div
        newBox.classList.add('box');

        // Append the new box to the gallery
        document.querySelector('.gallery').appendChild(newBox);
    });

    const myLibrary = [];

    function Book(name, author, pages, read) {
        // the constructor...
        this.book = name;
        this.author = author;
        this.pages = pages;
        this.hasRead = read;
    }

    function addBookToLibrary() {
        // do stuff here
    }

    console.log('DOM fully loaded and parsed');
});