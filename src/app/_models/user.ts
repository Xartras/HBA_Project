/*
    Klasa przedstawia model użytkownika.
*/

export class User 
{
    public login: string;
    public password: string;
    public email: string;
    public registerDate: Date

    public constructor(l: string, p: string, e: string)
    {
        this.login = l;
        this.password = p;
        this.email = e;
        this.registerDate = <Date><any>Date.now();
    }
}
