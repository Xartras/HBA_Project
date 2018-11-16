/*
    Klasa przedstawia model opłat domowych (media)
*/

export class HomeBillingItem 
{
    id:          string;
    name:        string;
    period:      string;
    actualState: number;
    difference:  number;
    actions:     string;

    constructor(i: string, n: string, p: string, as: number)
    {
        this.id          = i;
        this.name        = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.period      = p;
        this.actualState = as;
        this.actions     = "Edytuj;Usuń";
    }
}
