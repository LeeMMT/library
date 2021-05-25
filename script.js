const shelfArea = document.querySelector('section#shelf-area div:nth-child(2)');
const changeShelfSelect = document.querySelector('select');
const addBook = document.querySelector('.add-book');
const exitBtn = document.querySelector('.flex-row i');
const addbookBtn = document.querySelector('div.add-book button');

const bookForm = {
    titleData: titleData = document.querySelector('input#title'),
    authorData: document.querySelector('input#author'),
    pagesData: document.querySelector('input#pages'),
    shelfData: document.querySelector('select#progress')
}

let indexOfEdit = null;
let indexOfDelete = null;

const storageAvailable = function() {
    var storage;
    try {
        storage = window['localStorage'];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            (storage && storage.length !== 0);
    }
}

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

const book = function(title, author, pages, shelf) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.shelf= shelf;
}

book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? 'finished reading' : 'not read yet'}`;
}

const changeShelf = function() {
    shelfArea.innerHTML = '';
    if (changeShelfSelect.value === 'All') {
        storedLibrary.forEach(element => bookCardGenerator(element));
    } else {
        storedLibrary.filter(e => e.shelf === changeShelfSelect.value.toLocaleLowerCase()).forEach(element => bookCardGenerator(element));
    }
}

const btnSubmit = function() {
    if (addbookBtn.textContent === 'Add book') {
        addBookToLibrary();
    } else (updateChanges())
}

const addBookToLibrary = function() {
    const title = bookForm.titleData.value;
    const author = bookForm.authorData.value;
    const pages = bookForm.pagesData.value;
    const shelf = bookForm.shelfData.value;
    if (library.some(element => title.toLowerCase() === element.title.toLocaleLowerCase() && author.toLocaleLowerCase() === element.author.toLocaleLowerCase())) {
        return;
    }
    if (!bookForm.titleData.value || !bookForm.authorData.value) {
        return;
    }

    library.push(new book(title, author, pages, shelf));

    if (storageAvailable) {
        window.localStorage.setItem('storedLibrary', JSON.stringify(library));
    }

    if (changeShelfSelect.selectedIndex === 0 || shelf === changeShelfSelect.value) {
        bookCardGenerator(library[library.length - 1]);
    }

    bookForm.titleData.value = '';
    bookForm.authorData.value = '';
    bookForm.pagesData.value = '';
    bookForm.shelfData.selectedIndex = 0;
}

const openEditBook = function(e) {
    const DataAtr = +e.target.parentElement.parentElement.getAttribute('data-attribute');
    indexOfEdit = DataAtr;
    addbookBtn.textContent = 'Save changes';
    if (document.querySelector('#bottom-row').children.length === 1) {
        document.querySelector('.flex-row i').remove();
        const newExitBtn = document.createElement('i');
        newExitBtn.classList.add('far');
        newExitBtn.classList.add('fa-window-close');
        document.querySelector('.flex-row').appendChild(newExitBtn);
        newExitBtn.addEventListener('click', exitEdit);
        const cancelText = document.createElement('p');
        cancelText.textContent = 'Cancel';
        cancelText.style.fontSize = '0.9em';
        cancelText.style.color = '#00635D';
        document.querySelector('#bottom-row').appendChild(cancelText);
        cancelText.addEventListener('click', exitEdit);
    }
    if (addBook.classList.contains('form-enlarged') === false) {
        document.querySelector('div.add-book p').classList.toggle('invisible');
        addBook.classList.toggle('form-enlarged');
    }

    bookForm.titleData.value = library[DataAtr].title;
    bookForm.authorData.value = library[DataAtr].author;
    bookForm.pagesData.value = library[DataAtr].pages;
    bookForm.shelfData.value = library[DataAtr].shelf;
}

const exitEdit = function(e) {
    e.stopPropagation();
    addbookBtn.textContent = 'Add book';
    addBook.classList.toggle('form-enlarged');
    document.querySelector('div.add-book p').classList.toggle('invisible');
    bookForm.titleData.value = '';
    bookForm.authorData.value = '';
    bookForm.pagesData.value = '';
    bookForm.shelfData.selectedIndex = 0;
    document.querySelector('#bottom-row p').remove();
    document.querySelector('.flex-row i').remove();
    const newExitBtn = document.createElement('i');
    newExitBtn.classList.add('fas');
    newExitBtn.classList.add('fa-window-minimize');
    document.querySelector('.flex-row').appendChild(newExitBtn);
    newExitBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addBook.classList.toggle('form-enlarged');
        document.querySelector('div.add-book p').classList.toggle('invisible');
    })
}

const updateChanges = function(index) {
    const title = bookForm.titleData.value;
    const author = bookForm.authorData.value;
    const pages = bookForm.pagesData.value;
    const shelf = bookForm.shelfData.value;
    const editedBook = new book(title, author, pages, shelf);

    library.splice(indexOfEdit, 1, editedBook);
    
    if (storageAvailable) {
        window.localStorage.setItem('storedLibrary', JSON.stringify(library));
    }
    
    const bookCardToEdit = document.querySelector(`div[data-attribute='${indexOfEdit}']`);

    if (changeShelfSelect.selectedIndex === 0 || editedBook.shelf === changeShelfSelect.value) {
        bookCardToEdit.children[0].textContent = editedBook.title;
        bookCardToEdit.children[1].textContent = editedBook.author;
        bookCardToEdit.children[2].textContent = editedBook.pages;
        bookCardToEdit.children[3].textContent = editedBook.shelf;
    } else {
        bookCardToEdit.remove();
    }

    bookForm.titleData.value = '';
    bookForm.authorData.value = '';
    bookForm.pagesData.value = '';
    bookForm.shelfData.selectedIndex = 0;
    addbookBtn.textContent = 'Add book';
}

const deleteBookConfirmation = function(e) {
    const DataAtr = +e.target.parentElement.parentElement.getAttribute('data-attribute');
    if (indexOfDelete !== null) {
        document.querySelector('.confirm-card').remove();
    }
    indexOfDelete = DataAtr;
    const confirmCard = document.createElement('div');
    confirmCard.classList.add('confirm-card');
    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');
    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');
    const confirm = document.createElement('p');
    confirm.textContent = 'Delete';
    const cancel = document.createElement('p');
    cancel.textContent = 'Cancel';
    leftPanel.appendChild(cancel);
    rightPanel.appendChild(confirm);
    confirmCard.appendChild(leftPanel);
    confirmCard.appendChild(rightPanel);
    const insertedCard = shelfArea.insertBefore(confirmCard, e.target.parentElement.parentElement.nextSibling);
    window.setTimeout(() => insertedCard.classList.add('card-enlarged'));
    insertedCard.addEventListener('click', e => {
        if (e.target.textContent === 'Cancel') {
            insertedCard.remove();
            indexOfDelete = null;
        } else {
            deleteBook(DataAtr);
            insertedCard.remove();
            indexOfDelete = null;
        }
    })
}

const deleteBook = function(DataAtr) {
    document.querySelector(`div[data-attribute='${DataAtr}']`).remove();
    library.splice(DataAtr, 1);
    if (storageAvailable) {
        window.localStorage.setItem('storedLibrary', JSON.stringify(library));
    }
    const bookCards = document.querySelectorAll('div.book-card');
    for (let i = DataAtr + 1; i < bookCards.length; i++) {
        bookCards[i].setAttribute('data-attribute', i - 1);
    }
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

    editIcon.addEventListener('click', openEditBook);
    trashIcon.addEventListener('click', deleteBookConfirmation);
}

const libraryLoad = function() {
    if (storageAvailable) {
        library = JSON.parse(window.localStorage.getItem('library'));
    }
    library.forEach(element => bookCardGenerator(element));
}

libraryLoad();

changeShelfSelect.addEventListener('change', changeShelf);

addBook.addEventListener('click', () => {
    if (addBook.classList.contains('form-enlarged') === false) {
        document.querySelector('div.add-book p').classList.toggle('invisible');
        addBook.classList.toggle('form-enlarged');
    }
})

addbookBtn.addEventListener('click', btnSubmit);

exitBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    addBook.classList.toggle('form-enlarged');
    document.querySelector('.flex-row p').classList.toggle('invisible');
})