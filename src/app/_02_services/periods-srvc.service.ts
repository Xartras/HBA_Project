import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Period } from '../_01_models/period';
    

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

    periodsURL = 'http://localhost:4000/Periods';

    constructor(private http: HttpClient) { }


    // Pobranie Okresow
    getPeriods() 
    {
        console.log("Pobieranie danych");
        return this.http.get(`${this.periodsURL}`);
    }

    // Dodanie Okresu
    addPeriod(newPeriod: Period)
    {
        const period =
        {
            _id:         newPeriod.id,
            periodFrom:  newPeriod.from,
            periodUntil: newPeriod.until,
            user:        newPeriod.user
        }

        this.http.post(`${this.periodsURL}/add`, period).subscribe(res => console.log('Done', res));
    }
}