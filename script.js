const myLibrary = [];
const books = document.querySelector("#library");
const showForm = document.querySelector("#showForm");
const dialog = document.querySelector("#addBook")
const confirmBtn = document.querySelector("#confirmBtn");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookNumOfPages = document.querySelector("#bookNumOfPages");
const bookReadIt = document.querySelector("#readIt");

function Book(title, author, numOfPages, read, id){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.read = read;
    this.id = id;
    this.info = function () {
        return `${this.title} by ${this.author} has ${this.numOfPages} and you ${this.read} read it.`;
    }
}

function addBookToLibrary(title, author, numOfPages, read){
    let id = crypto.randomUUID()
    newBook = new Book(title, author, numOfPages, read, id);
    myLibrary.push(newBook);
}

function showLibrary(library){
    // Esta parte del codigo está para dejar limpia la zona en la que se muestran los lobros,
    // porque si no estuviera agregaria cada vez que agrego un libro, todos los libros de nuevo 
    // a la libreria.
    while (books.firstChild) {
        console.log("Estoy aqui");
        books.removeChild(books.firstChild);
      }
    library.forEach(book => {
        let newBook = document.createElement("div");
        newBook.setAttribute("class", "card");
        books.appendChild(newBook);
        for (const property in book) {
            if (property == "info") break;
            let newProperty = document.createElement("div");
            newProperty.textContent = `${property}: ${book[property]}`;
            newBook.appendChild(newProperty);
        }
    });
}

function clearForm(){
    bookTitle.value = "";
    bookAuthor.value = "";
    bookNumOfPages.value = "";
    bookReadIt.value = "";
}

showForm.addEventListener("click", () => {
    clearForm();
    dialog.showModal();
})

confirmBtn.addEventListener("click", (event) =>{
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookNumOfPages.value, bookReadIt.value);
    showLibrary(myLibrary);
    event.preventDefault();
    dialog.close();
})
