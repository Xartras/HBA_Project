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
        return this.http.get(`${this.periodsURL}/`);
    }

    // Dodanie Okresu
    addPeriod(from: Date, until: Date, user: String)
    {
        const period =
        {
            _id:        this.calculatePeriodID(from, until, user),
            periodFrom: from,
            periodUntil: until,
            user:        user
        }

        this.http.post(`${this.periodsURL}/add`, period).subscribe(res => console.log('Done', res));
    }

    // Kalkulacja ID
    private calculatePeriodID(from: Date, until: Date, user: String)
    {
        let calculatedID;

        calculatedID = "01_" + from.toString().substring(0,4) + "_" + user;

        return calculatedID;
    }
}