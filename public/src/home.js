function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let numberBooksBorrowed = 0;
  books.find((book) => {
    if (!book.borrows[0].returned) numberBooksBorrowed += 1;
  });
  return numberBooksBorrowed;
}

function getMostCommonGenres(books) {
  let genres = {};

  books.forEach((book) => { 
    const genre = book.genre;
    if (genres[genre]) {
      genres[genre] += 1;
    } else {
      genres[genre] = 1;
    }
  });

  const booksByGenreCount = Object.keys(genres).map(genreName => {
    return {
      name : genreName,
      count : genres[genreName]
    }
  });

  booksByGenreCount.sort((genreA, genreB) => genreB.count - genreA.count)
  return booksByGenreCount.slice(0, 5);
}


function getMostPopularBooks(books) {
  let popularBooks = {};

  books.forEach((bookInfo) => {
    const borrowInfo = bookInfo.borrows;
    const title = bookInfo.title;
    if (!popularBooks[title]) {
      popularBooks[title] = borrowInfo.length; 
    } else {
      popularBooks[title] += borrowInfo.length;
    }
    });

  const booksByPopularity = Object.keys(popularBooks).map(title => {
    return {
      name: title,
      count: popularBooks[title]
    }
  });

  booksByPopularity.sort((bookA, bookB) => bookB.count - bookA.count);
  return booksByPopularity.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  books.forEach((book) => {
    authors.forEach((author) => {
      const popularAuthor = `${author.name.first} ${author.name.last}`;
      if (book.authorId === author.id) {
        popularAuthors.push({
          name: popularAuthor,
          count: book.borrows.length
        });
      }    
    })  
  })
  return topFive(popularAuthors);
}
function topFive(array) {
  return array.sort ((a,b) => b.count - a.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
