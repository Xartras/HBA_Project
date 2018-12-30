import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicFeeItem } from '../_01_models/periodic-fee-item';

@Injectable({
  providedIn: 'root'
})
export class PeriodicFeesService {

  constructor(private http: HttpClient) { }

  periodicFeesURL = 'http://localhost:4000/PeriodicFees';


  // Pobranie Oplat okresowych
  getPeriodicFees() { return this.http.get(`${this.periodicFeesURL}`); }

  // Dodanie oplaty okresowej
  addPeriodicFee(newItem: PeriodicFeeItem) 
  {
    const obj = 
    {
      _id:             newItem.id,
      category:        newItem.category,
      name:            newItem.name,
      paidUntil:       newItem.paidUntil,
      paymentPeriod:   newItem.paymentPeriod,
      paymentDeadline: newItem.paymentDeadline,
      warnings:        newItem.warnings,
      user:            newItem.user

    };
    this.http.post(`${this.periodicFeesURL}/add`, obj).subscribe(res => console.log('Done'));
  }

  // Aktualizacja oplaty okresowej
  updatePeriodicFee(updatingItem: PeriodicFeeItem) 
  {
    this.deletePeriodicFee(updatingItem.id);
    this.addPeriodicFee(updatingItem)
  }

  // Usuniecie oplaty okresowej
  deletePeriodicFee(itemID) 
  {
    return this.http.get(`${this.periodicFeesURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
