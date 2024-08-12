document.addEventListener('DOMContentLoaded', function () {

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

        const book = document.getElementById("book-name").value;
        const author = document.getElementById("author-name").value;
        const pages = document.getElementById("book-pages").value;
        const read = document.getElementById("read-check").checked;

        const newBook = new Book(book, author, pages, read);
        //attach a unique id to the book
        newBook.id = bookCounter++;
        myLibrary.push(newBook);

        addBookToLibrary();
        console.table(myLibrary);
    });

    const myLibrary = [];

    //constructor function
    function Book(name, author, pages, read) {
        this.book = name;
        this.author = author;
        this.pages = pages;
        this.hasRead = read;
        this.id = null;
    }

    Book.prototype.toggleRead = function () {
        this.hasRead = !this.hasRead;
    };

    function addBookToLibrary() {
        const container = document.querySelector('.gallery');
        container.innerHTML = '';

        myLibrary.forEach((book) => {
            // Create a div element for the card
            const card = document.createElement('div');
            card.classList.add('box');

            // Create paragraph elements for the book details
            const titlePara = document.createElement('p');
            titlePara.textContent = `Title: ${book.book}`;

            const authorPara = document.createElement('p');
            authorPara.textContent = `Author: ${book.author}`;

            const pagesPara = document.createElement('p');
            pagesPara.textContent = `Pages: ${book.pages}`;


            // Create a div to hold the 'Has read:' label and checkbox
            const readContainer = document.createElement('div');
            readContainer.style.display = 'flex';
            readContainer.style.alignItems = 'center'; // Align items vertically centered
            readContainer.style.gap = '8px';

            // Create a paragraph for the 'read' status
            const readPara = document.createElement('p');
            readPara.textContent = `Has read: `;

            // Create a checkbox input for the 'read' status
            const readCheckbox = document.createElement('input');
            readCheckbox.type = 'checkbox';
            readCheckbox.checked = book.hasRead;

            // Attach an event listener to toggle the read status
            readCheckbox.addEventListener('change', function () {
                book.toggleRead();
                console.log(`Read status for "${book.book}" is now: ${book.hasRead}`);
            });

            //close button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "delete";
            deleteButton.setAttribute("data-id", book.id);
            deleteButton.addEventListener("click", (event) => {
                deleteBook(event.target);
            });

            // Append the paragraphs and checkbox to the card div
            card.appendChild(titlePara);
            card.appendChild(authorPara);
            card.appendChild(pagesPara);
            card.appendChild(readContainer);
            readContainer.appendChild(readPara);
            readContainer.appendChild(readCheckbox);
            card.appendChild(deleteButton);


            // Append the card to the container
            container.appendChild(card);
            console.log("called");
        });
    }

    function deleteBook(button) {
        const idToDelete = button.getAttribute('data-id');
        //Retrieves index based on matching id
        const indexToDelete = myLibrary.findIndex(book => book.id == idToDelete);
        if (indexToDelete !== -1) {
            myLibrary.splice(indexToDelete, 1);
            addBookToLibrary(); // Refresh the book display
            console.table(myLibrary);
        }
    }



    //default placeholder books for testing
    // myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true));
    // myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
    // myLibrary.push(new Book("1984", "George Orwell", 328, true));

    addBookToLibrary();

    console.log('DOM fully loaded and parsed');
});