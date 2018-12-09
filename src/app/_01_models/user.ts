/*
    Interfejs przedstawiajacy model uzytkownika
*/

export interface User 
{
    id: number
    login: string;
    password: string;
    email: string;
    registered: Date
}
