const myLibrary = [];

const book = ({
  bookId, title, author, pages, readStatus,
}) => {
  const removeBook = (e) => {
    const currentBookIndex = myLibrary.indexOf({ bookId, title });

    const current1 = e.target.parentElement.parentElement.getAttribute('index');
    console.log(current1);

    console.log(`Current Index found ${currentBookIndex}`);
    myLibrary.forEach(v => { console.log(v); });
    console.log('Current Array before splice complete');
    myLibrary.splice(currentBookIndex, 1);
    console.log('Current Array after splice start');
    myLibrary.forEach(v => { console.log(v); });
    console.log('Current Array after splice complete');
    const bookList = document.querySelector('.books-list');
    bookList.innerHTML = null;
    myLibrary.forEach((libraryBook) => {
      const storedBook = book(libraryBook);
      storedBook.render();
    });
  };

  const updateRow = (mainRow, innerHTMLText) => {
    const cell = document.createElement('td');
    cell.innerHTML = innerHTMLText;
    mainRow.appendChild(cell);
  };

  const render = () => {
    const bookList = document.querySelector('.books-list');
    const mainRow = document.createElement('tr');

    [bookId, title, author, pages].forEach(v => {
      updateRow(mainRow, v);
    });

    let cell = document.createElement('td');
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-sm', 'btn-danger');
    toggleButton.innerHTML = 'Blebla';

    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      const currentBookIndex = myLibrary.indexOf({ bookId, title });
      console.log(currentBookIndex);


      toggleButton.classList.add('btn', 'btn-primary');
      toggleButton.innerHTML = 'Read';
    });

    cell.appendChild(toggleButton);
    mainRow.appendChild(cell);

    cell = document.createElement('td');
    cell.classList.add('py-0', 'px-0');
    const deleteLink = document.createElement('a');
    // Add multiple classes - to classList https://stackoverflow.com/a/14432191
    deleteLink.classList.add('btn', 'btn-danger', 'my-2', 'btn-sm');
    deleteLink.addEventListener('click', (e) => {
      e.preventDefault();
      removeBook(e);
    });
    deleteLink.innerHTML = 'X';
    cell.appendChild(deleteLink);
    mainRow.appendChild(cell);
    bookList.appendChild(mainRow);
  };

  return { render };
};


const addBookToLibrary = (
  bookId, title, author, pages, readStatus,
) => {
  const currBook = book({
    bookId, title, author, pages, readStatus,
  });
  myLibrary.push(currBook);
  currBook.render();
};


const form = document.querySelector('.form-inline');
form.onsubmit = (e) => {
  // Dont allow default actions - https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  e.preventDefault();
  // Destructuring the event.target - https://stackoverflow.com/a/55188322
  const {
    title, author, pages, readStatus,
  } = e.target.elements;
  // Using the length to act as a 'unique' identifier.
  addBookToLibrary(myLibrary.length + 1, title.value, author.value, pages.value, readStatus.value);
  e.target.reset();
};
