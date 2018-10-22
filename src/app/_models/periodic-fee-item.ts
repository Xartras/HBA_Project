/*
    Klasa przedstawia model opłaty okresowej.
*/
export class PeriodicFeeItem 
{
    category: string;
    name: string;
    paidFrom: Date;
    paidUntil: Date;
    paymentPeriod: string;
    ifAlreadyPaid: boolean;

    constructor(c: string, n: string, pf: Date, pu: Date, pp: string, iap: boolean)
    {
        this.category = c;
        this.name = n;
        this.paidFrom = pf;
        this.paidUntil= pu;
        this.paymentPeriod = pp;
        this.ifAlreadyPaid = iap;
    }
}
