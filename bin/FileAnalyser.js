"use strict";
var Transaction_1 = require('./Transaction');
var Account_1 = require('./Account');
var FileAnalyser = (function () {
    function FileAnalyser() {
        this.transactions = [];
        this.accounts = [];
    }
    FileAnalyser.prototype.print_all = function () {
        console.log("Printing all accounts:");
        this.getAccounts();
        this.accounts.forEach(function (a) {
            a.print();
        });
    };
    FileAnalyser.prototype.print_account = function (target) {
        console.log("Printing the account of " + target + ":");
        var found_any = false;
        this.transactions.forEach(function (t) {
            if (t.account_from == target || t.account_to == target) {
                t.print();
                found_any = true;
            }
        });
        if (!found_any) {
            console.log("Failed to find an account with that name");
        }
    };
    FileAnalyser.prototype.getTransactionsCSV = function (file) {
        //split file into strings detailing the transactions
        var lines = file.split("\r\n");
        for (var f = 1; f < lines.length; f++) {
            var fields = lines[f].split(",");
            try {
                var price = parseFloat(fields[4]);
                if (isNaN(price) && fields[4] != undefined) {
                    console.log("Error: \'" + fields[4] + "\' is not a number");
                    throw null;
                }
                else {
                    if (fields[4] != undefined) {
                        this.transactions.push(new Transaction_1.Transaction(fields[0], //date
                        fields[1], //from
                        fields[2], //to
                        fields[3], //reason
                        price //amount
                        ));
                    }
                }
            }
            catch (exception) {
                console.log("Invalid data entry");
            }
        }
    };
    FileAnalyser.prototype.getTransactionsJSON = function (files) {
        var _this = this;
        files.forEach(function (f) {
            try {
                if (f["Date"] == undefined ||
                    f["FromAccount"] == undefined ||
                    f["ToAccount"] == undefined ||
                    f["Narrative"] == undefined ||
                    f["Amount"] == undefined)
                    throw null;
                _this.transactions.push(new Transaction_1.Transaction(f["Date"], f["FromAccount"], f["ToAccount"], f["Narrative"], f["Amount"]));
            }
            catch (exception) {
                console.log("Invalid data entry");
            }
        });
    };
    FileAnalyser.prototype.getAccounts = function () {
        var _this = this;
        this.transactions.forEach(function (t) {
            var found_to = false;
            var found_from = false;
            for (var a = 0; a < _this.accounts.length; a++) {
                if (_this.accounts[a].account_name == t.account_from) {
                    _this.accounts[a].addTransaction(-t.amount);
                    found_from = true;
                }
                if (_this.accounts[a].account_name == t.account_to) {
                    _this.accounts[a].addTransaction(t.amount);
                    found_to = true;
                }
            }
            if (!found_from && t.account_from != undefined) {
                _this.accounts.push(new Account_1.Account(t.account_from));
                _this.accounts[_this.accounts.length - 1].addTransaction(-t.amount);
            }
            if (!found_to && t.account_to != undefined) {
                _this.accounts.push(new Account_1.Account(t.account_to));
                _this.accounts[_this.accounts.length - 1].addTransaction(t.amount);
            }
        });
    };
    return FileAnalyser;
}());
exports.FileAnalyser = FileAnalyser;
//# sourceMappingURL=FileAnalyser.js.map