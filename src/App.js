import React, { Component } from "react";
import "./scss/App.scss";
import Editor from "./Components/Editor.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import NotesList from "./Components/NotesList";

/* Trying to keep state as simple as possible by 
    having a selected note which will allow us to keep 
    track of which note we're currently editing, and an 
    array that will contain our notes. Each index on 
    the notes array will be an object that will have 
    the id, text, and dateUpdated property for each note. 
    The lastId property keeps track of the last Id that
    was used do we don't duplicate a note's id even if 
    it ends up being deleted. Lastly, we're keeping track 
    of the search text in state so we can later filter 
    the notes array based on this input */
class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNote: { _id: null, text: "", dateUpdated: "" },
      notes: [],
      lastId: 1,
      searchText: ""
    };
    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.selectNoteHandler = this.selectNoteHandler.bind(this);
    this.editingNoteHandler = this.editingNoteHandler.bind(this);
    this.noteOrderHandler = this.noteOrderHandler.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  selectNoteHandler(currentNote) {
    this.setState({ selectedNote: currentNote }, () => {});
  }

  /* As we need to call this method in a few different methods, 
  it made sense to me to define the getDate function on it's own. 
  Helps make the code more modular */
  getDate() {
    const monthArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const dateObj = new Date();
    const numericMonth = dateObj.getUTCMonth();
    const monthName = monthArray[numericMonth];
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    // const hour = dateObj.getUTCHours() - 12;
    const time = dateObj.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    return `${monthName} ${day}, ${year} at ${time}`;
  }

  createNote() {
    const nextId = this.state.lastId + 1;
    const newNote = {
      _id: nextId,
      text: "",
      dateUpdated: this.getDate()
    };
    this.setState(prevState => ({
      selectedNote: newNote,
      notes: [newNote, ...prevState.notes],
      lastId: nextId
    }));
  }

  editingNoteHandler(currentNote) {
    let existingNotes = this.state.notes;
    if (currentNote.id === null) {
      this.createNote();
    } else {
      existingNotes.forEach(note => {
        if (note._id === currentNote._id) {
          const updateDate = this.getDate();
          note.text = currentNote.text;
          note.dateUpdated = updateDate;
          return;
        }
      });
      this.setState({ selectedNote: currentNote, notes: existingNotes });
    }
  }

  /* This method handles our event when the user is searching 
  for a note, cannot find it,and hits enter therefore creating 
  a new note. I had some issues calling this.newNote() in here, 
  so I instead insantiated a newNote object and updated state 
  this way. Ideally, I would re-work the method to use 
  the already defined createNote()*/
  keyPressed(event, initialText) {
    const nextId = this.state.lastId + 1;
    const code = event.keycode || event.which;
    if (code === 13) {
      const newNote = {
        _id: nextId,
        text: initialText,
        dateUpdated: this.getDate()
      };
      this.setState(prevState => ({
        selectedNote: newNote,
        notes: [newNote, ...prevState.notes],
        searchNotes: ""
      }));
    }
  }
  /* This method updates the order of our notes array and 
  therefore triggers a re-render to have the note currently 
  being edited move to the top of the notes list in the app */
  noteOrderHandler(currentNote) {
    let existingNotes = [...this.state.notes];
    let updatedNotes = [];
    existingNotes.splice(existingNotes.indexOf(currentNote), 1);
    updatedNotes = [currentNote, ...existingNotes];
    this.setState({ selectedNote: currentNote, notes: updatedNotes });
  }

  searchNotes(searchText) {
    this.setState({ searchText: searchText });
  }

  clearSearch = () => {
    this.setState({ searchText: "" });
  };

  /* Because I have saved the notes as an array of objects, I am filtering out the note being deleted as delete cannot be called on an array */
  deleteNote() {
    let noteToDelete = this.state.selectedNote;
    let existingNotes = [...this.state.notes];
    let updatedNotes = existingNotes.filter(note => {
      if (note._id !== noteToDelete._id) {
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      selectedNote: { _id: null, text: "", dateUpdated: "" }
    });
  }

  render() {
    return (
      <div className="app">
        <MenuBar
          createNote={this.createNote}
          deleteNote={this.deleteNote}
          searchNotes={this.searchNotes}
          searchText={this.state.searchText}
          keyPressed={this.keyPressed}
          clearSearch={this.clearSearch}
        />
        <NotesList
          notes={this.state.notes}
          selectNoteHandler={this.selectNoteHandler}
          searchNotes={this.searchNotes}
          searchText={this.state.searchText}
        />
        <Editor
          selectedNote={this.state.selectedNote}
          editingNoteHandler={this.editingNoteHandler}
          noteOrderHandler={this.noteOrderHandler}
        />
      </div>
    );
  }
}
export default App;
