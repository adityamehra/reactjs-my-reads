import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './App.css'
import CurrentReads from './CurrentReads'
import WantToRead from './WantToRead'
import AlreadyRead from './AlreadyRead'

class ShelfOfBooks extends Component{

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentReads
              onUpdateShelf={this.props.onUpdateShelf}
              books={this.props.books.filter((book) => book.shelf === 'currentlyReading')}
            />
            <WantToRead
              onUpdateShelf={this.props.onUpdateShelf}
              books={this.props.books.filter((book) => book.shelf === 'wantToRead')}
            />
            <AlreadyRead
              onUpdateShelf={this.props.onUpdateShelf}
              books={this.props.books.filter((book) => book.shelf === 'read')}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ShelfOfBooks
