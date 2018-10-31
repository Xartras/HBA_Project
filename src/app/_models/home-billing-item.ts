/*
    Klasa przedstawia model opłat domowych (media)
*/

export class HomeBillingItem 
{
    name: string;
    period: string;
    actualState: number;
    difference: number;
    actions: string;

    constructor(n: string, p: string, as: number, d: number)
    {
        this.name = n;
        this.period = p;
        this.actualState = as;
        this.difference = d;
        this.actions = "Edytuj;Usuń";
    }
}
