import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

/* Declaring a style for the searchbox as this allowed 
for easier styling in order to incorporate the SVG of 
the magnifying glass in in the input bar. Rendering the 
svg inside the input bar is not possible as input is a void element */
const searchStyle = {
  border: "1px solid #DDD"
};
const circleStyle = {
  border: "none"
};
const Search = props => {
  let { searchText, searchNotes, keyPressed, clearSearch } = props;
  return (
    <div className="searchbox" style={searchStyle}>
      <input
        id="searchText"
        type="text"
        placeholder="Search"
        value={searchText}
        /* On change allows us to capture every key stroke 
        entered by the user to input state, and then check 
        to see if any notes contain the passed in search criteria */
        onChange={e => {
          searchText = e.target.value;
          searchNotes(searchText);
        }}
        /* This is what allows the user to hit enter 
        and create a new note if their search does not 
        return an existing note */
        onKeyUp={event => {
          keyPressed(event, searchText);
        }}
      ></input>
      <FontAwesomeIcon
        //Clears our search bar
        onClick={clearSearch}
        icon={faTimesCircle}
        style={circleStyle}
        id="clearsearch"
        color="#737373"
      />
    </div>
  );
};

export default Search;
