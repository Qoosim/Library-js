let myLibrary = [];

const book = (bookId, title, author) => {

    const render = () => {
        let bookList = document.querySelector('.books-list');
        let mainRow = document.createElement('tr');

        let cell = document.createElement('td');
        cell.innerHTML = bookId;
        mainRow.appendChild(cell);

        cell = document.createElement('td');
        cell.innerHTML = title;
        mainRow.appendChild(cell);
        
        cell = document.createElement('td');
        cell.innerHTML = author;
        mainRow.appendChild(cell);

        console.log(typeof bookList);
        bookList.appendChild(mainRow);
    }


    return { title, author, render };
};


const addBookToLibrary = (bookId, title, author) => {
    let b = book(bookId, title, author);
    myLibrary.push(b);
}

const renderToTable = () => {
  myLibrary.forEach((book) => {
      book.render();
  });
}

// const form = document.forms.bookValues
const form = document.querySelector('form');
form.onsubmit = (e) => {
    e.preventDefault();
    const c = Object.values(form).reduce((obj, field) => { obj[field.name] = field.value; return obj; }, {});
    console.log(c);
}



const removeFromLibrary = (t) => {

}
