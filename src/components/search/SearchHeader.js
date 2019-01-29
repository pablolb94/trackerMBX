import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class SearchHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
        <div className="SearchHeader" style={{padding: '20px'}} >
            <div className="searchbar">
                <input className="search_input" type="text" onChange={evt => this.props.updateSearchFilter(evt)} placeholder="Busqueda" />
            </div>
        </div>
    ) 
  }
}

export default SearchHeader;
