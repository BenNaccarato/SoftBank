/// <reference path="../typings/index.d.ts" />
"use strict";
var readline = require('readline');
var FileAnalyser_1 = require('./FileAnalyser');
var filename;
var fileType;
var analyser = new FileAnalyser_1.FileAnalyser();
//Read the file
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Filename to read: ', function (input) {
    filename = input;
    fileType = filename.split(".")[1];
    //interprets the file depending on its type
    switch (fileType) {
        case "json":
            readJSON(filename);
            break;
        case "xml":
            readXML(filename);
            break;
        default:
            readCSV(filename);
    }
    console.log("File successfully read");
    //Get the desired instruction
    rl.question('Input command: ', function (command) {
        if (command.substr(0, 5) == "List ") {
            var target = command.substr(5, command.length - 5);
            if (target == "All") {
                analyser.print_all();
            }
            else {
                analyser.print_account(target);
            }
        }
        else {
            console.log("Invalid command. Exiting now");
            quit();
        }
        //close the program
        console.log("Exiting now");
        quit();
    });
});
function readCSV(filename) {
    try {
        var fs = require('fs');
        var the_file = fs.readFileSync(filename, { encoding: 'utf8' });
        analyser.getTransactionsCSV(the_file);
    }
    catch (exception) {
        console.log("Failed to read the file. Exiting now");
        quit();
    }
}
function readJSON(filename) {
    try {
        var fs = require('fs');
        var the_file = fs.readFileSync(filename, { encoding: 'utf8' });
        var the_objects = JSON.parse(the_file);
        analyser.getTransactionsJSON(the_objects);
    }
    catch (exception) {
        console.log("Failed to read the file. Exiting now");
        quit();
    }
}
function readXML(filename) {
}
function quit() {
    rl.close();
    process.exit();
}
//# sourceMappingURL=app.js.map