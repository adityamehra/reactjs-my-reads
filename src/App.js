import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import ShelfOfBooks from './ShelfOfBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((data) => {
      BooksAPI.getAll().then((books) => {
        console.log(books)
        this.setState({ books })
      })
     }
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>(
          <ShelfOfBooks
            books={this.state.books}
            onUpdateShelf={this.changeShelf}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdateShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
