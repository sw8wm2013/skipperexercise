import React from "react";
import MenuBarBox from "./MenuBarBox.jsx";
// importing the font awesome circle so we can have the 3 window controls present
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search.jsx";

const MenuBar = props => {
  /* Destructuring the necessary properties from props. I prefer doing this as I think it makes for cleaner looking code below */
  const {
    createNote,
    deleteNote,
    searchNotes,
    searchText,
    keyPressed,
    clearSearch
  } = props;
  return (
    <div className="menubar">
      <div className="circles">
        <FontAwesomeIcon className="circle" icon={faCircle} color="#E86C62" />
        <FontAwesomeIcon className="circle" icon={faCircle} color="#F3BF5A" />
        <FontAwesomeIcon className="circle" icon={faCircle} color="#6AC35A" />
      </div>
      <MenuBarBox createNote={createNote} deleteNote={deleteNote} />
      <Search
        searchNotes={searchNotes}
        searchText={searchText}
        createNote={createNote}
        keyPressed={keyPressed}
        clearSearch={clearSearch}
      />
    </div>
  );
};

export default MenuBar;
