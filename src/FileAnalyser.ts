
import { Transaction } from './Transaction';
import { Account } from './Account';

export class FileAnalyser {

    private transactions:Transaction[];
    private accounts:Account[];

    constructor(){
        this.transactions = [];
        this.accounts = [];
    }

    print_all(){
        console.log("Printing all accounts:");
        this.getAccounts();
        this.accounts.forEach( a => {
            a.print();
        });
    }

    print_account(target:string){
        console.log("Printing the account of "+target+":");
        var found_any:boolean = false;
        this.transactions.forEach(t => {
            if(t.account_from == target || t.account_to == target){
                t.print();
                found_any = true;
            }
        });
        if(!found_any) {
            console.log("Failed to find an account with that name");
        }
    }

    getTransactionsCSV(file:string){
        //split file into strings detailing the transactions
        var lines:string[] = file.split("\r\n");
        for (var f = 1;f<lines.length;f++) { //first line is field names
            var fields:string[] = lines[f].split(",");
            try{
                var price:number = parseFloat(fields[4]);
                if(isNaN(price) && fields[4] != undefined){
                    console.log("Error: \'"+fields[4]+"\' is not a number");
                    throw null;
                } else {
                    if(fields[4] != undefined){
                        this.transactions.push(new Transaction(
                            fields[0],//date
                            fields[1],//from
                            fields[2],//to
                            fields[3],//reason
                            price//amount
                        ));
                    }
                }
            } catch(exception) {
                console.log("Invalid data entry");
            }
        }
    }

    getTransactionsJSON(files:Object[]) {
        files.forEach(f => {
            try {
                if(f["Date"] == undefined ||
                f["FromAccount"] == undefined || 
                f["ToAccount"] == undefined ||
                f["Narrative"] == undefined ||
                f["Amount"] == undefined) throw null;
                this.transactions.push(new Transaction(
                    f["Date"],
                    f["FromAccount"],
                    f["ToAccount"],
                    f["Narrative"],
                    f["Amount"]
                ));
            }
            catch(exception) {
                console.log("Invalid data entry");
            }
        });
    }


    getAccounts(){
        this.transactions.forEach(t => {
            var found_to:boolean = false;
            var found_from:boolean = false;
            for(var a = 0;a<this.accounts.length; a++){
                if(this.accounts[a].account_name == t.account_from){
                    this.accounts[a].addTransaction(-t.amount);
                    found_from = true;
                }
                if(this.accounts[a].account_name == t.account_to){
                    this.accounts[a].addTransaction(t.amount);
                    found_to = true;
                }
            }
            if(!found_from && t.account_from != undefined){//added undefined check to not use erroneous transactions
                this.accounts.push(new Account(t.account_from));
                this.accounts[this.accounts.length-1].addTransaction(-t.amount);
            }
            if(!found_to && t.account_to != undefined){
                this.accounts.push(new Account(t.account_to));
                this.accounts[this.accounts.length-1].addTransaction(t.amount);
            }
        });
    }

}