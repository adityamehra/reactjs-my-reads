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
    console.log("prev shelf " + book.shelf)
    console.log("id of the book is " + book.id);
    BooksAPI.update(book, newShelf).then((data) => {
      console.log(data)
      // if( this.state.books.find((b) => b.id === book.id)){
      //   // get the the new books array
      //   // book.shelf = newShelf
      //   console.log("new shelf 1 " + book.shelf)
      //   BooksAPI.getAll().then((books) => {
      //     console.log(books)
      //     this.setState({ books })
      //   })
      //   console.log(data[newShelf])
      // } else {
      //   console.log("new shelf 1" + book.shelf)
      //   // book.shelf = newShelf
        BooksAPI.getAll().then((books) => {
          console.log(books)
          this.setState({ books })
        })
        console.log("new shelf 2" + book.shelf)
        // this.setState( state => ({
        //   books: this.state.books.concat([book])
        // }))
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
