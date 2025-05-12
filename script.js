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

function Book(title, author, numOfPages, read, id){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
    this.id = id;
}

Book.prototype.changeStatus = function () {
    if (this.read.toLowerCase() == "unread"){
        this.read = "Read";
    } else{
        this.read = "Unread";
    }
}


function addBookToLibrary(title, author, numOfPages, read){
    let id = crypto.randomUUID();
    newBook = new Book(title, author, numOfPages, read, id);
    myLibrary.push(newBook);
}

function showLibrary(library){
    // Esta parte del codigo está para dejar limpia la zona en la que se muestran los lobros,
    // porque si no estuviera agregaria cada vez que agrego un libro, todos los libros de nuevo 
    // a la libreria.
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }
    library.forEach(book => {
        let newBook = document.createElement("div");
        newBook.setAttribute("class", "card");
        books.appendChild(newBook);
        for (const property in book) {
            if (property == "info" || property == "id" || property == "changeStatus") continue;
            let newProperty = document.createElement("div");
            newProperty.textContent = `${property}: ${book[property]}`;
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
            })
        })
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

function clearForm(){
    bookTitle.value = "";
    bookAuthor.value = "";
    bookNumOfPages.value = "";
    bookReadIt.checked = false;
}

showForm.addEventListener("click", () => {
    clearForm();
    dialog.showModal();
})

confirmBtn.addEventListener("click", (event) =>{
    let status;
    if (bookReadIt.checked){
        status = "Read"
    } else {
        status = "Unread"
    }
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookNumOfPages.value, status);
    showLibrary(myLibrary);
    event.preventDefault();
    dialog.close();
})

addBookToLibrary("Harry Potter", "J. K. Rowling", "109", "Unread");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", "1178", "Urnead");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", "Unread");
addBookToLibrary("1984", "George Orwell", "328", "Read");
addBookToLibrary("Pride and Prejudice", "Jane Austen", "432", "Unread");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "277", "Unread");
addBookToLibrary("The Da Vinci Code", "Dan Brown", "489", "Unread");
addBookToLibrary(" The Alchemist", "Paulo Coelho", "208", "Read");
showLibrary(myLibrary);