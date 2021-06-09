const fs = require('fs');
const chalk =require('chalk');

const warning=chalk.red.italic.bold;
const msg=chalk.green.italic;
const para = chalk.magenta.italic;

var fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync('notes.txt'));
  } catch (err) {
    return [];
  }
}

var AddNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var filteredNotes = notes.filter((note) => note.title === title);

  if(filteredNotes.length === 0){
    notes.push(note);
    fs.writeFileSync("notes.txt", JSON.stringify(notes));
    PrintNote(note);
    console.log(msg("Adding new note with title " + title + " :)"));
  } 
  else {
    console.log(warning("Title already exists.Please try other title"));
    
  }
}

var DeleteNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  if(filteredNotes.length==notes.length){ // no note found
    console.log(warning("No such note found with title "+ title));
  }
  else{
    fs.writeFileSync("notes.txt", JSON.stringify(filteredNotes));
    console.log(warning(title +' removed :('));
  }
  
}


var ReadNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  if(filteredNotes.length==0) console.log(warning("No such note found with title "+ title));
  else {
    PrintNote(filteredNotes[0]);
    console.log(msg("Reading "+title+" !"));
  }
}

var AllNotes = () => {
  var notes = fetchNotes();
  if(notes.length===0) {
      console.log(warning("List is empty..Try adding notes"));
  }
  else{
    console.log(chalk.yellow.italic.bold("Title - body"))
    notes.forEach((note) => PrintNote(note));
  }
  
}

var PrintNote = (note) => {
  console.log(para(`${note.title} - ${note.body} `));
 
}
var clearList = () => {
    var notes = fetchNotes();
    notes = [];
    fs.writeFileSync("notes.txt", JSON.stringify(notes));
    console.log(warning("Cleared all notes :("));
    
}

module.exports = {
  AddNote,
  DeleteNote,
  ReadNote,
  AllNotes,
  clearList

}