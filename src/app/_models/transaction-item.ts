/*
    Klasa przedstawia model transakcji wprowadzanych do aplikacji
*/

export class TransactionItem 
{
    type: string;
    category: string;
    name: string;
    amount: number;
    accounted: string;
    entered: string;
    period: string;
    description: string;

    constructor(t: string, c: string, n: string, a: number, act: string, ent: string, p: string, d: string)
    {
        this.type = t;
        this.category = c;
        this.name = n;
        this.amount = a;
        this.accounted = act;
        this.entered = ent;
        this.period = p;
        this.description = d;
    }
}
