/*
    Klasa przedstawia model użytkownika.
*/

export class User 
{
    public login: string;
    public password: string;
    public email: string;
    public periodStart: Date;
    public periodEnd: Date;

    public constructor(l: string, p: string, e: string, ps: Date, pe: Date)
    {
        this.login = l;
        this.password = p;
        this.email = e;
        this.periodStart = ps;
        this.periodEnd = pe;
    }
}
