export class SavingPlanItem 
{
    id:              string;
    target:          string;
    plannedAmount:   number;
    currentAmount:   number;
    getUntil:        string;
    comment:         string;
    user:            string;

    constructor(i: string, t: string, pa: number, ca: number, gu: string, c: string, u: string)
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
