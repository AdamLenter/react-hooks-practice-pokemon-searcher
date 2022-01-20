import React from "react";

function Search( {searchTerm, updateSearchTerm } ) {

  function handleSearch(event) {
    const newSearchTerm = event.target.value;
    updateSearchTerm(newSearchTerm);
  }
  
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" onChange = {handleSearch} value = {searchTerm} />
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
