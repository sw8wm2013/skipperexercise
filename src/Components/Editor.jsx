import React, { useEffect, useRef } from "react";

const Editor = props => {
  const { selectedNote, editingNoteHandler, noteOrderHandler } = props;
  const inputRef = useRef();

  /* This sets the focus to this component whenever 
  a new note is created so the user can immediately 
  begin typing on the new note */
  useEffect(() => {
    inputRef.current.focus();
  }, [selectedNote._id]);

  return (
    <div className="editor">
      <textarea
        ref={inputRef}
        value={selectedNote.text}
        /* With every keystroke, we're updating state
        to modify not only the note's text property,
        but the dateUpated property and resulting in
        a re-render of the notesList to show the
        currently edited note at the top of the list */
        onChange={e => {
          selectedNote.text = e.target.value;
          editingNoteHandler(selectedNote);
          noteOrderHandler(selectedNote);
        }}
      ></textarea>
    </div>
  );
};
export default Editor;
