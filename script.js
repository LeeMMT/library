let myLibrary = [
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
    myLibrary.push(newBook);
}