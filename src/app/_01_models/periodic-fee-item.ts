/*
    Klasa przedstawia model opłaty okresowej.
*/
export class PeriodicFeeItem 
{
    id:              string;
    category:        string;
    name:            string;
    paidUntil:       string;         
    paymentPeriod:   string;
    paymentDeadline: string;
    warnings:        string;
    actions:         string;

    constructor(i: string, ct: string, n: string, pu: string, pp: string, pd: string, w: string)
    {
        this.id              = i;
        this.category        = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name            = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.paidUntil       = pu;
        this.paymentPeriod   = pp;
        this.paymentDeadline = pd;
        this.warnings        = w;
        this.actions         = "Edytuj;Usuń";
    }
}
