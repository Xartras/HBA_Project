/*
    Klasa przedstawia model opłaty okresowej.
*/
export class PeriodicFeeItem 
{
    id:            string;
    category:      string;
    name:          string;
    paidFrom:      string;
    paidUntil:     string;
    paymentPeriod: string;
    ifAlreadyPaid: boolean;
    actions:       string;

    constructor(i: string, ct: string, n: string, pf: string, pu: string, pp: string, iap: boolean)
    {
        this.id            = i;
        this.category      = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name          = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.paidFrom      = pf;
        this.paidUntil     = pu;
        this.paymentPeriod = pp;
        this.ifAlreadyPaid = iap;
        this.actions       = "Edytuj;Usuń";
    }
}
