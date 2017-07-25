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
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((data) => {
      book.shelf = newShelf
      this.setState(state => ({ books: state.books.filter(b => b.id !== book.id).concat([book]) }))
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
            books={this.state.books}
            onUpdateShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
