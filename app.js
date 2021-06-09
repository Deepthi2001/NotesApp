console.log("----------------------");
console.log("this is notes application");

const fs = require('fs');

const yargs = require('yargs');
const notes = require('./notes.js');
const argv = yargs.argv;

const chalk =require('chalk');
const msg=chalk.green.italic;

var data = yargs.argv.data;
var title = yargs.argv.title;
var body = yargs.argv.body;
var command = yargs.argv._[0];

switch(command){
    case("add"):
    notes.AddNote(title, body);
    break;

    case("remove"):
    notes.DeleteNote(title);
    break;

    case("read"):
    notes.ReadNote(title);
    break;

    case("list"):
    console.log(msg("Printing all notes!!"));
    console.log("-------------------");
    notes.AllNotes();
    break;
    

    case("clear"):
    notes.clearList();
    break;

    default: console.log(warning("Unknown command used..Please try given commands only"));

}




