import React, { Component } from "react";
import "./css/App.css";
// import Sidebar from "./Components/Sidebar.jsx";
import Editor from "./Components/Editor.jsx";
import MenuBar from "./Components/MenuBar.jsx";
import { create } from "domain";
import NotesList from "./Components/NotesList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNote: { _id: null, text: "", dateUpdated: "" },
      notes: [
        {
          _id: 1,
          text: "this is my first note",
          dateUpdated: "November 10, 2019 at 10:19am"
        }
      ],
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
  }

  selectNoteHandler(currentNote) {
    this.setState({ selectedNote: currentNote });
  }

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
    const nextId = (this.state.lastId += 1);
    const newNote = { _id: nextId, text: "", dateUpdated: this.getDate() };
    this.setState({ selectedNote: newNote });
  }
  c;

  noteOrderHandler(currentNote) {
    let existingNotes = [...this.state.notes];
    let [editedNote] = existingNotes.splice(
      existingNotes.indexOf(currentNote),
      1
    );
    existingNotes.unshift(editedNote);
    this.setState({ selectedNote: currentNote, notes: existingNotes });
  }

  searchNotes(searchText) {
    this.setState({ searchText: searchText });
  }

  keyPressed(event, initialText) {
    const nextId = (this.state.lastId += 1);
    const code = event.keycode || event.which;
    if (code === 13) {
      // create new note
      const newNote = {
        _id: nextId,
        text: initialText,
        dateUpdated: this.getDate()
      };
      this.setState({ selectedNote: newNote, searchNotes: "" }, () => {
        console.log("IVE PRESSED ENTER", this.state.selectedNote);
      });
      //need to show all notes again
    }
  }

  deleteNote(noteToDelete) {
    let updatedNotes = this.state.notes;
    if (this.state.selectedNote._id === noteToDelete._id) {
      updatedNotes.slice(this.state.selectedNote._id, 1);
    }

    this.setState({
      notes: updatedNotes,
      selectedNote: { _id: null, text: "", dateUpdated: "" }
    });
  }

  render() {
    return (
      <div className="app">
        <MenuBar
          notes={this.state.notes}
          createNote={this.createNote}
          deleteNote={this.deleteNote}
          selectNote={this.selectNoteHandler}
          searchNotes={this.searchNotes}
          searchText={this.state.searchText}
          keyPressed={this.keyPressed}
        />
        <NotesList
          notes={this.state.notes}
          selectedNote={this.state.selectedNote}
          createNote={this.createNote}
          deleteNote={this.deleteNote}
          selectNoteHandler={this.selectNoteHandler}
          searchNotes={this.searchNotes}
          searchText={this.state.searchText}
        />
        <Editor
          notes={this.state.notes}
          selectedNote={this.state.selectedNote}
          selectNote={this.selectNoteHandler}
          editingNoteHandler={this.editingNoteHandler}
          noteOrderHandler={this.noteOrderHandler}
        />
      </div>
    );
  }
}
export default App;
