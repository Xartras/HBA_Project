import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodicFeeItem } from '../_01_models/periodic-fee-item';

@Injectable({
  providedIn: 'root'
})
export class PeriodicFeesService {

  constructor(private http: HttpClient) { }

  periodicFeesURL = 'http://localhost:4000/PeriodicFees';

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
      actions:         newItem.actions,
      user:            newItem.user

    };
    this.http.post(`${this.periodicFeesURL}/add`, obj).subscribe(res => console.log('Done'));
  }

  // Aktualizacja oplaty okresowej
  updatePeriodicFee(updadingItem: PeriodicFeeItem, id) 
  {
    console.log(id);
    const obj = {
      _id:             id,
      category:        updadingItem.category,
      name:            updadingItem.name,
      paidUntil:       updadingItem.paidUntil,
      paymentPeriod:   updadingItem.paymentPeriod,
      paymentDeadline: updadingItem.paymentDeadline,
      warnings:        updadingItem.warnings,
      actions:         updadingItem.actions,
      user:            updadingItem.user
    };
    this
      .http
      .post(`${this.periodicFeesURL}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  // Usuniecie oplaty okresowej
  deletePeriodicFee(itemID) 
  {
    return this.http.get(`${this.periodicFeesURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
