/*
    Interfejs przedstawiajacy model uzytkownika
*/

export interface User 
{
    id:         string
    login:      string;
    password:   string;
    email:      string;
    registered: Date;
    expTime:    number;
}
  
export interface TokenResponse 
{
    token: string;
}
  
export interface RegisteredToken
{
    login:    string;
    password: string;
}
