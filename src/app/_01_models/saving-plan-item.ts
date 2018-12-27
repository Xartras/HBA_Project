export class SavingPlanItem 
{
    id:              string;
    target:          string;
    plannedAmount:   Number;
    currentAmount:   Number;
    getUntil:        Date;
    actions:         string;
    user:            string;

    constructor(i: string, t: string, pa: Number, ca: Number, gu: Date, u: string)
    {
        this.id            = i;
        this.target        = t;
        this.plannedAmount = pa;
        this.currentAmount = ca;
        this.getUntil      = gu;
        this.actions       = "Edytuj;Usuń";
        this.user          = u;
    }
}
