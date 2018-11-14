/*
    Klasa przedstawia model wpisow magazynu domu.
*/

export class WerehouseItem 
{
    id:       string;
    category: string;
    name:     string;
    state:    string;
    actions:  string;

    public constructor(c: string, ct: string, n: string, s: string)
    {
        this.id       = c;
        this.category = ct.substring(0,1).toUpperCase() + ct.substring(1, ct.length).toLowerCase();
        this.name     = n.substring(0,1).toUpperCase() + n.substring(1, n.length).toLowerCase();
        this.state    = s;
        this.actions  = "Edytuj;Usuń";
    }
}
