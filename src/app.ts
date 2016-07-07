/// <reference path="../typings/index.d.ts" />

import * as readline from 'readline';
import { FileAnalyser } from './FileAnalyser';

var filename:string;
var the_file:string;

//Read the file
var rl = readline.createInterface(process.stdin, process.stdout);
rl.question('Filename to read: ', input => {
    try{
        filename = input;
        var fs = require('fs');
        the_file = fs.readFileSync(filename,{ encoding: 'utf8' });
        console.log("Read the file");
    } catch(exception) {
        console.log("Failed to read the file. Exiting now");
        rl.close();
        process.exit();
    }
    //make an analyser object to interpret the csv file
    var analyser = new FileAnalyser(the_file);
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
        rl.close();
        process.exit();
        }
        //close the program
        console.log("Exiting now");
        rl.close();
        process.exit();
    });
});