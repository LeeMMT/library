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

const container = document.querySelector('#container');

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
    container.appendChild(bookCard);
}

const libraryLoad = function() {
    library.forEach(element => bookCardGenerator(element));
}

libraryLoad();