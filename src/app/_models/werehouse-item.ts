/*
    Klasa przedstawia model wpisow magazynu domu.
*/

export class WerehouseItem 
{
    public category: string;
    public name: string;
    public state: string;
    public actions: string

    public constructor(c: string, n: string, s: string)
    {
        this.category = c;
        this.name = n;
        this.state;
        this.actions = "Edytuj;Usuń";
    }
}
