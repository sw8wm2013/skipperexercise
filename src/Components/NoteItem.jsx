import React, { useState } from "react";

const NoteItem = props => {
  /* Using local state and the useState hook here in 
  order to determine if a note's CSS formatting should
  be changed. We only want a note that is selected to 
  have a yellow background, otherwise, we want there 
  to be no background color. So we're using useState 
  to update this based on the defined changeColor function */
  const [yellow, setYellow] = useState(false);

  function changeColor() {
    setYellow(!yellow);
  }

  const { text, date, selectNoteHandler, _id } = props;
  const currentNote = {
    _id: _id,
    text: text,
    date: date
  };
  let noteItemClass = yellow ? "yellowbutton" : "nocolor";
  return (
    <div className={noteItemClass}>
      <div
        className="notetitle"
        onClick={() => {
          selectNoteHandler(currentNote);
          changeColor();
        }}
      >
        {text}
        <br></br>
        <span className="notedate"> {date}</span>
      </div>
    </div>
  );
};

export default NoteItem;
