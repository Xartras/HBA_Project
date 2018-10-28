/*
    Klasa przedstawia model użytkownika.
*/

export class User 
{
    public login: string;
    public password: string;
    public email: string;
    public periodStart: string;
    public periodEnd: string;

    public constructor(l: string, p: string, e: string, ps: string, pe: string)
    {
        this.login = l;
        this.password = p;
        this.email = e;
        this.periodStart = ps;
        this.periodEnd = pe;
    }
}
