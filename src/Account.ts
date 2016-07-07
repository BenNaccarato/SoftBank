export class Account {
    account_name:string;
    total_amount:number;

    constructor(name:string){
        this.account_name = name;
        this.total_amount = 0;
    }

    addTransaction(cost:number){ //positive is money to, negative is money given
        this.total_amount += cost;
    }

    print() {
        console.log(this.account_name+": "+(this.total_amount<0?"owes £":"owed £")+((this.total_amount<0?-1:1)*this.total_amount).toFixed(2));
    }
}