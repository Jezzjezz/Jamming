import './SearchBar.css';
import React from 'react';


class SearchBar extends React.Component {
constructor(props){
  super(props);
  this.state = {term: ''};
//Step 72
  this.search = this.search.bind(this);
  this.handleTermChange = this.handleTermChange.bind(this);
}

//Step 70
handleTermChange(event){
    this.setState({term: event.target.value});
}

//Step 69
search(term){
  this.props.onSearch(this.state.term);
}
  render(){
    return (
      <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
      <a>SEARCH</a>
      </div>
    )
  }
}


export default SearchBar;
