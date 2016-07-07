export class Transaction {

    transaction_date:string;
    account_from:string;
    account_to:string;
    narrative:string;
    amount:number;

    constructor(date:string, a_from:string, a_to:string, reason:string, price:number) {
        this.transaction_date = date;
        this.account_from = a_from;
        this.account_to = a_to;
        this.narrative = reason;
        this.amount = price;
    }

    print(){
        console.log(this.transaction_date+": "+this.account_from+" => "+this.account_to+": £"+this.amount.toFixed(2)+" ("+this.narrative+")");
    }
}