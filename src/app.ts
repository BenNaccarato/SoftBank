/// <reference path="../typings/index.d.ts" />

import * as readline from 'readline';
import * as xml2js from 'xml2js';
import { FileAnalyser } from './FileAnalyser';

var filename:string;
var fileType:string;

var analyser = new FileAnalyser();

//Read the file
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Filename to read: ', input => {
        filename = input;
        fileType = filename.split(".")[1];
        //reads the file (as text)
        try{
            var fs = require('fs');
            var the_file = fs.readFileSync(filename,'utf8');
        } catch(exception) {
            console.log("Failed to read the file. Exiting now");
            quit();
        }
        console.log("File successfully read, extracting transactions...");
        //analyses the file (depending on type)
        switch(fileType){
            case "json":
                readJSON(the_file);
                break;
            case "xml":
                readXML(the_file);
                break;
            default:
                readCSV(the_file);
        }
        console.log("Transactions obtained");
        
    //Get the desired instruction
    rl.question('Input command: ', command => {
        if(command.substr(0,5) == "List "){
            var target:string = command.substr(5, command.length-5);
            if(target == "All"){
                analyser.print_all();
            } else {
                analyser.print_account(target);
            }
        } else {
        console.log("Invalid command. Exiting now");
        quit();
        }
        //close the program
        console.log("Exiting now");
        quit();
    });
});


function readCSV(the_file:string){
    analyser.getTransactionsCSV(the_file);
}
function readJSON(the_file:string){
    try{
        var the_objects:Object[] = JSON.parse(the_file);
        analyser.getTransactionsJSON(the_objects);
    } catch(exception) {
        console.log("Failed to interpret the file. Exiting now");
        quit();
    }
}
function readXML(file:string){
    var parser = new xml2js.Parser();
    parser.parseString(file, (err: any, result: any) => {
        analyser.getTransactionsXML(result.TransactionList.SupportTransaction);
    });
}

function quit() {
    rl.close();
    process.exit();
}