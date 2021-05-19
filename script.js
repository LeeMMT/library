const shelfArea = document.querySelector('#shelf-area');
const addBook = document.querySelector('.add-book');
const exitBtn = document.querySelector('div.add-book i');
const addbookBtn = document.querySelector('div.add-book button');
const titleData = document.querySelector('input#title');
const authorData = document.querySelector('input#author');
const pagesData = document.querySelector('input#pages');
const progressData = document.querySelector('select#progress');

let library = [
    {title: 'The Three Body Problem',
    author: 'Liu Cixin',
    pages: '448',
    read: true},
    {title: 'The Dark Forest',
    author: 'Liu Cixin',
    pages: '513',
    read: true},
    {title: 'Death\'s End',
    author: 'Liu Cixin',
    pages: '605',
    read: true}];

//Functions

const book = function(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? 'finished reading' : 'not read yet'}`;
}

const addBookToLibrary = function() {
    const newBook = new book(title, author, pages, read);
    library.push(newBook);
}

const bookCardGenerator = function(e)  {
    const bookCard = document.createElement('div');
    bookCard.classList.toggle('book-card');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const shelf = document.createElement('p');
    title.textContent = e.title;
    author.textContent = e.author;
    pages.textContent = e.pages;
    shelf.textContent = e.shelf;
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(shelf);
    shelfArea.appendChild(bookCard);
}

const libraryLoad = function() {
    library.forEach(element => bookCardGenerator(element));
}

libraryLoad();

addBook.addEventListener('click', (e) => {
    if (addBook.classList.contains('add-book-enlarged') === false) {
        addBook.classList.toggle('add-book-enlarged');
    }
    console.log(e.target);
})

exitBtn.addEventListener('click', () => {
    addBook.classList.toggle('add-book-enlarged');
    console.log(addBook.classList);
});