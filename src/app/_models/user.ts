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

    // Metoda pobiera użytkownika na podstawie loginu
    // Jeśli podano zły login lub użytkownik nie istnieje to metoda zwróci null
    public getUser() : User
    {
        let example_users : User[] =
        [
           new User("Admin", "Admin", "Admin@mail.com", "20180101", "20180131"),
           new User("Xarq", "Qrax", "Xarq@mail.com", "201801027", "20180226")
        ]

        let usr : User

        for(let i = 0; i <= example_users.length - 1; i++)
        {
            if(example_users[i].login == this.login)
            { usr = example_users[i]; break; } 
            else 
            { usr = null; continue; }
        }

        return usr;
    }

    // Metoda sprawdza czy podano prawidłowe hasło
    public validateLogForm(dbUser: User) : boolean
    {
       let validationResult = this.password == dbUser.password ? true : false;

       return validationResult;
    }

    // Metoda sprawdza czy dany użytkownik o danym loginie istnieje
    // Jeśli tak to nie będzie możliwe zarejestrowanie użytkownika
    public validateRegForm(formUser: User) : boolean
    {
        let checkUser = this.getUser()

        return checkUser != null ? true : false;
    }
}
