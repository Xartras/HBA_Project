/*
    Klasa przedstawia model wpisow magazynu domu.
*/

export class WerehouseItem 
{
    public category: string;
    public name: string;
    public state: string;

    public constructor(c: string, n: string, s: string)
    {
        this.category = c;
        this.name = n;
        this.state;
    }

    public addItem(c: string, n: string, s: string) : void
    {
        console.log(c + " " + n + " " + s)
    }

    public removeItem(c: string, n: string, s: string)
    {
        console.log(c + " " + n + " " + s)
    }

    public updateItem(c: string, n: string, s: string)
    {
        console.log(c + " " + n + " " + s)
    }

    public getData() {}
}
