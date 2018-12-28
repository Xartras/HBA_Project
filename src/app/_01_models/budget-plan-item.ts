/*
    Klasa przedstawia model wpisów dotyczących planowania budżetu.
*/

export class BudgetPlanItem 
{
    id:          string;
    type:        string;
    category:    string;
    name:        string;
    period:      string;
    amount:      number;
    comment:     string;
    actions:     string;
    user:        string;

    constructor(i: string, t: string, ct: string, n: string, p: string, a: number, cm: string, u: string)
    {
        this.id          = i;
        this.type        = t;
        this.category    = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name        = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.amount      = a;
        this.period      = p;
        this.comment     = cm;
        this.actions     = "Edytuj;Usuń";
        this.user        = u;
    }
}