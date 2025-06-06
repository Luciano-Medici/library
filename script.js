const myLibrary = [];
const books = document.querySelector("#library");
const showForm = document.querySelector("#showForm");
const dialog = document.querySelector("#addBook")
const confirmBtn = document.querySelector("#confirmBtn");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookNumOfPages = document.querySelector("#bookNumOfPages");
const bookReadIt = document.querySelector("#readIt");
const deleteButtons = document.querySelectorAll("[data-id]");

// Adding Classes instead of object constructor

class Book{
    constructor(title, author, numOfPages, status, id){
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.status = status;
        this.id = id;
    }

    changeStatus() {
        this.status = this.status === "Unread" ? "Read" : "Unread" ;
    }

    static clearForm(){
        bookTitle.value = "";
        bookAuthor.value = "";
        bookNumOfPages.value = "";
        bookReadIt.checked = false;
    }
}

function addBookToLibrary(title, author, numOfPages, status){
    let id = crypto.randomUUID();
    const newBook = new Book(title, author, numOfPages, status, id);
    myLibrary.push(newBook);
}

function showLibrary(library){
    books.textContent = "";

    library.forEach(book => {
        let newBook = document.createElement("div");
        newBook.setAttribute("class", "card");
        books.appendChild(newBook);
        for (const property in book) {
            if (property == "info" || property == "id" || property == "changeStatus") continue;
            let newProperty = document.createElement("div");
            switch(property){
                case "title":
                    newProperty.textContent = `Title: ${book[property]}`;
                    break;
                case "author":
                    newProperty.textContent = `Author: ${book[property]}`;
                    break;
                case "numOfPages":
                    newProperty.textContent = `Number of pages: ${book[property]}`;
                    break;
                case "status":
                    newProperty.textContent = `Status: ${book[property]}`;
                    break;
            }
            newBook.appendChild(newProperty);
        }
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-id", book.id);
        deleteButton.textContent = "Delete";
        newBook.appendChild(deleteButton);
        deleteButton.addEventListener("click", e => {
            myLibrary.forEach(book => {
                if (book.id == e.target.dataset.id){
                    myLibrary.splice(myLibrary.indexOf(book), 1);
                }
                showLibrary(myLibrary);
            });
        });
        let bookStatus = document.createElement("button");
        bookStatus.setAttribute("type", "button");
        bookStatus.textContent = "Change status";
        bookStatus.addEventListener("click", () => {
            book.changeStatus();
            showLibrary(myLibrary);
        });
        newBook.appendChild(bookStatus);
    });
}

// function clearForm(){
//     bookTitle.value = "";
//     bookAuthor.value = "";
//     bookNumOfPages.value = "";
//     bookReadIt.checked = false;
// }

showForm.addEventListener("click", () => {
    Book.clearForm();
    dialog.showModal();
})

confirmBtn.addEventListener("click", (event) =>{
    let status = getStatus(bookReadIt.checked);
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookNumOfPages.value, status);
    showLibrary(myLibrary);
    event.preventDefault();
    dialog.close();
})

function getStatus(status){
    if(status) return "read";
    else return "Unread"
}

addBookToLibrary("Harry Potter", "J. K. Rowling", "109", "Unread");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", "1178", "Urnead");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", "Unread");
addBookToLibrary("1984", "George Orwell", "328", "Read");
addBookToLibrary("Pride and Prejudice", "Jane Austen", "432", "Unread");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "277", "Unread");
addBookToLibrary("The Da Vinci Code", "Dan Brown", "489", "Unread");
addBookToLibrary(" The Alchemist", "Paulo Coelho", "208", "Read");
showLibrary(myLibrary);