function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountOne, accountTwo) => accountOne.name.last.toLowerCase() > accountTwo.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let numberOfBorrows = 0;
  return books.reduce((total, {borrows}) => {
    if (borrows.some((info) => info.id === accountId)) numberOfBorrows++;
    return numberOfBorrows;
  }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {

  let arrayOfBorrowedBooks = books.filter((book) => book.borrows[0].id === account.id && !book.borrows[0].returned);
  
  return arrayOfBorrowedBooks.map((book) => {
    const authorInfo = authors.find((author) => author.id === book.authorId); 
    book.author = authorInfo;
    return book;
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
