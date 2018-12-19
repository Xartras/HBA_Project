/*
    Interfejs przedstawiajacy model uzytkownika oraz tokenów walidujących
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
    login:       string;
    password:    string;
    registered?: Date;
    email?:      string;
}
