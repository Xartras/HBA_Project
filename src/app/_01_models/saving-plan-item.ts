export class SavingPlanItem 
{
    id:              string;
    target:          string;
    plannedAmount:   Number;
    currentAmount:   Number;
    getUntil:        string;
    comment:         string;
    user:            string;

    constructor(i: string, t: string, pa: Number, ca: Number, gu: string, c: string, u: string)
    {
        this.id            = i;
        this.target        = t;
        this.plannedAmount = pa;
        this.currentAmount = ca;
        this.getUntil      = gu;
        this.comment       = c;
        this.user          = u;
    }
}
