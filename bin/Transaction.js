"use strict";
var Transaction = (function () {
    function Transaction(date, a_from, a_to, reason, price) {
        this.transaction_date = date;
        this.account_from = a_from;
        this.account_to = a_to;
        this.narrative = reason;
        this.amount = price;
    }
    Transaction.prototype.print = function () {
        console.log(this.transaction_date + ": " + this.account_from + " => " + this.account_to + ": £" + this.amount.toFixed(2) + " (" + this.narrative + ")");
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map