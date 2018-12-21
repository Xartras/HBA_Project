// Klasa przedstawiajaca model okresu rozliczeniowego

export class Period 
{
    id:    string;
    from:  Date;
    until: Date;
    user:  string;

    constructor(i: string, f: Date, u: Date, us: string)
    {
        this.id    = i;
        this.from  = f;
        this.until = u;
        this.user  = us;
    }
}
