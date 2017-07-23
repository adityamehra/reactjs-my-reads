import React from 'react'
import * as BooksAPI from './BooksAPI'
import CurrentReads from './CurrentReads'
import WantToRead from './WantToRead'
import AlreadyRead from './AlreadyRead'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // changeShelf = (book) => {
  //   this.setState((state)) => ({
  //    books =
  //   })
  // }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
           books={this.state.books}
           showSearchPage={this.state.showSearchPage}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentReads
                  books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                />
                <WantToRead
                  books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                />
                <AlreadyRead
                  books={this.state.books.filter((book) => book.shelf === 'read')}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
