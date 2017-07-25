import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    showingBooks: []
  }

  booksOnShelf = this.props.books

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if(query.trim().length > 0) {
      BooksAPI.search(query).then((books) => {
        if(books !== undefined){
          this.booksOnShelf.forEach((book1) => {
            books.forEach((book2) => {
              if(book1.id === book2.id){
                book2.shelf = book1.shelf
              }
            })
          })
          this.setState({ showingBooks: books })
        } else {
            this.setState({ showingBooks: []})
        }
      })
    } else {
        this.setState({ showingBooks: []})
    }
  }

  render() {
    const { query } = this.state
    const onUpdateShelf = this.props.onUpdateShelf
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link  to='/' className="close-search">
            Close
          </Link>
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
            { query === '' &&
                (<div>
                   <h2> Try searching with these terms:</h2>
                   <p>
                     'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo',
                     'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                   </p>
                 </div>
                )
            }
            { !Array.isArray(this.state.showingBooks) &&
                (
                 <div>
                   <h2> Try searching with these terms:</h2>
                   <p>
                     'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo,
                     'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                   </p>
                 </div>
                )
            }
            { Array.isArray(this.state.showingBooks) &&  query !== '' &&
                this.state.showingBooks.map((book, i) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")` }}></div>
                        <div className="book-shelf-changer">
                          <select  value={book.shelf} onChange={(event) => onUpdateShelf(book, event.target.value)}>
                            <option disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      { book.authors !== undefined &&
                          book.authors.map((author) => (
                            <div className="book-authors" key={author}>{author}</div>
                          ))
                      }
                    </div>
                  </li>
                ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
