/*
    Klasa przedstawia model transakcji wprowadzanych do aplikacji
*/

import { formatDate } from '@angular/common'

export class TransactionItem 
{
    id:          string;
    type:        string;
    subType:     string;
    category:    string;
    name:        string;
    amount:      number;
    description: string;
    accounted:   Date;
    entered:     Date;
    period:      string;
    comment:     string;
    user:        string;

    constructor(i: string, t: string, st: string, ct: string, n: string, a: number, d: string, act: Date, ent: Date, p: string, c: string, u: string)
    {
        this.id          = i;
        this.type        = t;
        this.subType     = st.substring(0,1).toUpperCase() + st.substring(1, st.length).toLowerCase();
        this.category    = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name        = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.amount      = a;
        this.description = d;
        this.accounted   = act
        this.entered     = ent;
        this.period      = p;
        this.comment     = c;
        this.user        = u;
    }
}
