import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})
  }

  render(){
    const books = this.props.books
    // const showSearchPage = this.props.showSearchPage
    let showingBooks
    const { query } = this.state

    if(query){
      console.log(query)
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    console.log(showingBooks);

    return(
     <div className="search-books">
       <div className="search-books-bar">
         <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
         <div className="search-books-input-wrapper">
           {/*
             NOTES: The search from BooksAPI is limited to a particular set of search terms.
             You can find these search terms here:
             https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

             However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
             you don't find a specific author or title. Every search is limited by search terms.
           */}
           <input
             type="text"
             placeholder="Search by title or author"
             value={query}
             onChange={(event) => this.updateQuery(event.target.value)}
            />
         </div>
       </div>
       <div className="search-books-results">
         <ol className="books-grid">
           {showingBooks.map((book) => (
             <li key={book.title}>
               <div className="book">
                 <div className="book-top">
                   <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")` }}></div>
                 </div>
                 <div className="book-title">{book.title}</div>
                 {book.authors.map((author) => (
                   <div className="book-authors" key={author}>{author}</div>
                 ))}
               </div>
             </li>
           ))}
         </ol>
       </div>
     </div>
    )
  }
}

export default SearchBooks
