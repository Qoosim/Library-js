const myLibrary = [];

const book = ({
  bookId, title, author, pages, readStatus,
}) => {
  const getBook = {
    bookId, title, author, pages, readStatus,
  };

  const removeBook = (e) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    const selectedBookIndex = myLibrary.filter((v) => (v.bookId === bookId
      && v.title === title))[0];
    e.target.parentElement.parentElement.remove();
    // Added radix parameter to parseInt
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
    myLibrary.splice(parseInt(selectedBookIndex, 10), 1);
  };

  const updateRow = (mainRow, innerHTMLText) => {
    const cell = document.createElement('td');
    cell.innerHTML = innerHTMLText;
    mainRow.appendChild(cell);
  };

  const render = () => {
    const bookList = document.querySelector('.books-list');
    const mainRow = document.createElement('tr');
    mainRow.setAttribute('index', bookId);

    [bookId, title, author, pages].forEach(v => {
      updateRow(mainRow, v);
    });

    let cell = document.createElement('td');
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'w-50');
    if (getBook.readStatus) {
      toggleButton.classList.add('btn-success');
      toggleButton.classList.remove('btn-danger');
      toggleButton.innerHTML = 'Yeah!';
    } else {
      toggleButton.classList.add('btn-danger');
      toggleButton.classList.remove('btn-success');
      toggleButton.innerHTML = 'Nope!';
    }

    toggleButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (getBook.readStatus) {
        getBook.readStatus = false;
        toggleButton.classList.add('btn-danger');
        toggleButton.classList.remove('btn-success');
        toggleButton.innerHTML = 'Nope!';
      } else {
        getBook.readStatus = true;
        toggleButton.classList.add('btn-success');
        toggleButton.classList.remove('btn-danger');
        toggleButton.innerHTML = 'Yeah!';
      }
    });

    cell.appendChild(toggleButton);
    mainRow.appendChild(cell);

    cell = document.createElement('td');
    const deleteLink = document.createElement('a');
    // Add multiple classes - to classList https://stackoverflow.com/a/14432191
    deleteLink.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteLink.addEventListener('click', (e) => {
      e.preventDefault();
      removeBook(e);
    });
    deleteLink.innerHTML = 'X';
    cell.appendChild(deleteLink);
    mainRow.appendChild(cell);
    bookList.appendChild(mainRow);
  };

  return { render, getBook };
};

const addToLibrary = (
  bookId, title, author, pages, readStatus,
) => {
  const currBook = book({
    bookId, title, author, pages, readStatus,
  });
  myLibrary.push(currBook.getBook);
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
  addToLibrary(myLibrary.length + 1, title.value, author.value, pages.value, readStatus.checked);
  e.target.reset();
};
