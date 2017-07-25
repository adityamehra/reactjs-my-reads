import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AlreadyRead extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render(){
    const { books, onUpdateShelf } = this.props
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, i) => (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")` }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => onUpdateShelf(book, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
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

export default AlreadyRead
