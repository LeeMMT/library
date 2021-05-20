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
    shelf: 'read'},
    {title: 'The Dark Forest',
    author: 'Liu Cixin',
    pages: '513',
    shelf: 'read'},
    {title: 'Death\'s End',
    author: 'Liu Cixin',
    pages: '605',
    shelf: 'read'}];

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
    const title = titleData.value;
    const author = authorData.value;
    const pages = pagesData.value;
    const read = progressData.value;
    if (library.some(element => title.toLowerCase() === element.title.toLocaleLowerCase() && author.toLocaleLowerCase() === element.author.toLocaleLowerCase())) {
        return;
    }
    library.push(new book(title, author, pages, read));
    bookCardGenerator(library[library.length - 1]);
}

const bookCardGenerator = function(e)  {
    const bookCard = document.createElement('div');
    bookCard.classList.toggle('book-card');
    bookCard.setAttribute('data-attribute', `${library.indexOf(e)}`);
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const shelf = document.createElement('p');
    const iconArea = document.createElement('div');
    const editIcon = document.createElement('i');
    editIcon.classList.add('far');
    editIcon.classList.add('fa-edit');
    editIcon.classList.add('fa-xs');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('far');
    trashIcon.classList.add('fa-trash-alt');
    trashIcon.classList.add('fa-xs');
    trashIcon.style.marginLeft = '4px';
    iconArea.appendChild(editIcon);
    iconArea.appendChild(trashIcon);
    title.textContent = e.title;
    author.textContent = e.author;
    pages.textContent = e.pages;
    shelf.textContent = e.shelf;
    
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(shelf);
    bookCard.appendChild(iconArea);
    shelfArea.appendChild(bookCard);

    trashIcon.addEventListener('click', console.log('yo'));
}

const libraryLoad = function() {
    library.forEach(element => bookCardGenerator(element));
}

libraryLoad();

addBook.addEventListener('click', (e) => {
    if (addBook.classList.contains('add-book-enlarged') === false) {
        document.querySelector('div.add-book p').classList.toggle('invisible');
        addBook.classList.toggle('add-book-enlarged');
    }
})

exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addBook.classList.toggle('add-book-enlarged');
    document.querySelector('div.add-book p').classList.toggle('invisible');
});

addbookBtn.addEventListener('click', addBookToLibrary);