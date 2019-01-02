/*
    Klasa przedstawia model zużycia zasobów domowych
*/

export class HomeBillingItem 
{
    id:          string;
    name:        string;
    period:      string;
    quantity:    string;
    comment:     string;
    user:        string;

    constructor(i: string, n: string, p: string, q: string, c: string, u: string)
    {
        this.id       = i;
        this.name     = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.period   = p;
        this.quantity = q;
        this.comment  = c;
        this.user     = u;
    }
}
