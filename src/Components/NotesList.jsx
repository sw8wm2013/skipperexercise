import React from "react";
import NoteItem from "./NoteItem.jsx";

const NotesList = props => {
  const { notes, selectNoteHandler, searchText } = props;
  /* Below I am filtering through the notes array based on whether or
  not the user is searching. If they are not searching, we render all
  existing notes, otherwise, we only render the notes that match */
  const notesMap = notes
    .filter(note => {
      return note.text.toLowerCase().includes(searchText.toLowerCase());
    })
    .map(note => {
      return (
        <NoteItem
          text={note.text}
          date={note.dateUpdated}
          _id={note._id}
          key={note._id}
          selectNoteHandler={selectNoteHandler}
        />
      );
    });
  return <div className="noteslist">{notesMap}</div>;
};
export default NotesList;
