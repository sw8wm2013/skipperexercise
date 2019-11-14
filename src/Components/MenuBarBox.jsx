import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowMaximize,
  faEdit,
  faTrashAlt,
  faCheckCircle
} from "@fortawesome/free-regular-svg-icons";
import { faLock, faBorderAll } from "@fortawesome/free-solid-svg-icons";

/* With refactoring, I would make this component a reusable 
component that would outline the button. I would import it 
into the MenuBar component, and render the appropriate 
fontaweomse icon  to help make this cleaner, more DRY code */
const MenuBarBox = props => {
  const { createNote, deleteNote } = props;
  return (
    <div className="menubarbox">
      <button id="folderbutton">
        <FontAwesomeIcon
          id="folderimage"
          icon={faWindowMaximize}
          size="2x"
          alt="Show folders"
          rotation={270}
          color="#737373"
        />
      </button>
      <button id="browsebutton">
        <FontAwesomeIcon
          id="browseimage"
          icon={faBorderAll}
          size="2x"
          alt="Browse attachments such as photos, maps, and more"
          color="#737373"
        />
      </button>
      <button id="deletebutton">
        <FontAwesomeIcon
          id="deleteimage"
          icon={faTrashAlt}
          size="2x"
          alt="Delete note"
          onClick={deleteNote}
          onBlur={deleteNote}
          color="#737373"
        />
      </button>
      <button id="createbutton">
        <FontAwesomeIcon
          id="createimage"
          icon={faEdit}
          size="2x"
          alt="Add note"
          onClick={createNote}
          onBlur={createNote}
          color="#737373"
        />
      </button>
      <button id="checkbutton">
        <FontAwesomeIcon
          icon={faCheckCircle}
          id="checkimage"
          size="2x"
          alt="Make a checklist"
          color="#737373"
        />
      </button>
      <button id="lockbutton">
        <FontAwesomeIcon
          icon={faLock}
          id="lockimage"
          size="2x"
          alt="Lock note"
          color="#737373"
        />
      </button>
    </div>
  );
};

export default MenuBarBox;
