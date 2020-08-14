// Starting with default values. Simulating Database
const myLibrary = [{
  bookId: 99, title: 'The Gift', author: 'Danielle Steele', pages: 5,
}];

const book = ({
  bookId, title, author, pages,
}) => {
  const updateRow = (mainRow, innerHTMLText) => {
    const cell = document.createElement('td');

    cell.innerHTML = innerHTMLText;
    mainRow.appendChild(cell);
  };

  const removeBook = () => {
    const currentBookIndex = myLibrary.indexOf({ bookId, title });
    myLibrary.splice(currentBookIndex, 1);
    const bookList = document.querySelector('.books-list');
    bookList.innerHTML = null;
    myLibrary.forEach((libraryBook) => {
      const storedBook = book(libraryBook);
      storedBook.render();
    });
  };

  const render = () => {
    const bookList = document.querySelector('.books-list');
    const mainRow = document.createElement('tr');
    // Loop through args to create a row.
    [bookId, title, author, pages].forEach(v => {
      updateRow(mainRow, v);
    });
    const deleteLink = document.createElement('a');
    // Add multiple classes - to classList https://stackoverflow.com/a/14432191
    deleteLink.classList.add('btn', 'btn-danger', 'my-2');
    deleteLink.addEventListener('click', (e) => {
      e.preventDefault();
      removeBook();
    });
    deleteLink.innerHTML = 'X';

    mainRow.appendChild(deleteLink);
    bookList.appendChild(mainRow);
  };

  return { render };
};

const renderBooksToTable = () => {
  const bookList = document.querySelector('.books-list');
  bookList.innerHTML = null;
  myLibrary.forEach((libraryBook) => {
    const storedBook = book(libraryBook);
    storedBook.render();
  });
};

renderBooksToTable();

const addBookToLibrary = (
  bookId, title, author, pages,
) => {
  const currBook = book({
    bookId, title, author, pages,
  });
  myLibrary.push(currBook);
  currBook.render();
};


const form = document.querySelector('.form-inline');
form.onsubmit = (e) => {
  // Dont allow default actions - https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  e.preventDefault();
  // Destructuring the event.target - https://stackoverflow.com/a/55188322
  const { title, author, pages } = e.target.elements;
  // Using the length to act as a 'unique' identifier.
  addBookToLibrary(myLibrary.length + 1, title.value, author.value, pages.value);
  e.target.reset();
};
