/*
    Klasa przedstawia model opłaty okresowej.
*/
export class PeriodicFeeItem 
{
    category: string;
    name: string;
    paidFrom: string;
    paidUntil: string;
    paymentPeriod: string;
    ifAlreadyPaid: boolean;
    actions: string;

    constructor(c: string, n: string, pf: string, pu: string, pp: string, iap: boolean)
    {
        this.category = c;
        this.name = n;
        this.paidFrom = pf;
        this.paidUntil= pu;
        this.paymentPeriod = pp;
        this.ifAlreadyPaid = iap;
        this.actions = "Edytuj;Usuń";
    }
}
