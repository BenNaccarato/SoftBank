"use strict";
var Account = (function () {
    function Account(name) {
        this.account_name = name;
        this.total_amount = 0;
    }
    Account.prototype.addTransaction = function (cost) {
        this.total_amount += cost;
    };
    Account.prototype.print = function () {
        console.log(this.account_name + ": " + (this.total_amount < 0 ? "owes £" : "owed £") + ((this.total_amount < 0 ? -1 : 1) * this.total_amount).toFixed(2));
    };
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=Account.js.map