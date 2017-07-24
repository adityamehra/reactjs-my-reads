import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import CurrentReads from './CurrentReads'
import WantToRead from './WantToRead'
import AlreadyRead from './AlreadyRead'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((data) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
     }
    )
  }

  render() {
    console.log("Number of books " + this.state.books.length)
    return (
      <div className="app">
        <Route exact path='/' render={() =>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentReads
                  onUpdateShelf={this.changeShelf}
                  books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                />
                <WantToRead
                  onUpdateShelf={this.changeShelf}
                  books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                />
                <AlreadyRead
                  onUpdateShelf={this.changeShelf}
                  books={this.state.books.filter((book) => book.shelf === 'read')}
                />
              </div>
            </div>
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link to='/add'>Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/add' render={() => (
          <SearchBooks
           books={this.state.books}
           onUpdateShelf={this.changeShelf}
           showSearchPage={this.state.showSearchPage}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
