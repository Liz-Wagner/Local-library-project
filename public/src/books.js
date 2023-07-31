function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let allBooksOrganizedByAvailability = [];
  let arrayOfAvailableBooks = [];
  let arrayOfBorrowedBooks = [];

  books.forEach((book) => {
    book.borrows[0].returned ? arrayOfAvailableBooks.push(book) : arrayOfBorrowedBooks.push(book);
  })
  allBooksOrganizedByAvailability.push(arrayOfBorrowedBooks);
  allBooksOrganizedByAvailability.push(arrayOfAvailableBooks);
  return allBooksOrganizedByAvailability;
}

function getBorrowersForBook(book, accounts) {
  const borrowArray = book.borrows;
  const fullArray = borrowArray.map((borrow) => {
    const accountInfo = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...accountInfo}
  });
  return fullArray.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
