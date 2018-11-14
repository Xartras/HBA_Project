/*
    Klasa przedstawia model transakcji wprowadzanych do aplikacji
*/

export class TransactionItem 
{
    id:          string;
    type:        string;
    category:    string;
    name:        string;
    amount:      number;
    accounted:   string;
    entered:     string;
    period:      string;
    description: string;
    actions:     string;

    constructor(t: string, ct: string, n: string, a: number, act: string, ent: string, p: string, d: string)
    {
        this.type        = t;
        this.category    = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name        = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.amount      = a;
        this.accounted   = act;
        this.entered     = ent;
        this.period      = p;
        this.description = d;
        this.actions     = "Edytuj;Usuń";
    }
}
