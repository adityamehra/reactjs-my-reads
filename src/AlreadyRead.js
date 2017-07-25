import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

class AlreadyRead extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render(){
    const { books, onUpdateShelf } = this.props
    return(
     <BookShelf
       onUpdateShelf={this.props.onUpdateShelf}
       books={this.props.books}
     />
    )
  }
}

export default AlreadyRead
