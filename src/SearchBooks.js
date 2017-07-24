import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (query) => {
    // console.log("arg " + query.trim())
    // console.log("state " + this.state.query)
    this.setState({ query: query.trim() })
    // console.log("arg " + query)
    // console.log("state " + this.state.query);
    // using query because this.state.query deosn't work
    if(query.trim().length > 0) {
      // console.log("inside if " + this.state.query)
      // console.log("inside if arg " + query)
      BooksAPI.search(query).then((books) => {
        if(books !== undefined){
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
    return (
     <div className="search-books">
       <div className="search-books-bar">
         <Link  to='/' className="close-search">Close</Link>
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
               (<div><h2> Try searching with these terms:</h2>
               <p>'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo' </p>
               <p>'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS' </p>
               </div>
               )
           }
           { Array.isArray(this.state.showingBooks) &&  query !== '' &&
               this.state.showingBooks.map((book, i) => (
                   <li key={i}>
                     <div className="book">
                       <div className="book-top">
                         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")` }}></div>
                         <div className="book-shelf-changer">
                           {console.log(book.shelf)}
                           <select  value={book.shelf} onChange={(event) => this.props.onUpdateShelf(book, event.target.value)}>
                             <option value="none" disabled>Move to...</option>
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
           { !Array.isArray(this.state.showingBooks) &&
               (
                <div>
                  <h2> Try searching with these terms:</h2>
                  <p>
                    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo, 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
                  </p>
                </div>
               )
           }
         </ol>
       </div>
     </div>
    )
  }
}

export default SearchBooks
