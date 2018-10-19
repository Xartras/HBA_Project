/*
    Klasa przedstawia model wpisów dotyczących planowania budżetu.
*/

export class BudgetPlanItem 
{
    type: string;
    category: string;
    name: string;
    amount: number;
    comment: string;

    constructor(t: string, ct: string, n: string, a: number, cm: string)
    {
        this.type = t;
        this.category = ct;
        this.name = n;
        this.amount = a;
        this.comment = cm;
    }
}