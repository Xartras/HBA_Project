import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeBillingItem } from '../_01_models/home-billing-item';

@Injectable({
  providedIn: 'root'
})
export class HomeBillingsService {

  constructor(private http: HttpClient) { }

  resourcesURL = 'http://localhost:4000/Resources';


  // Pobranie Oplat okresowych
  getResources() { return this.http.get(`${this.resourcesURL}`); }

  // Dodanie oplaty okresowej
  addResource(newItem: HomeBillingItem) 
  {
    const obj = 
    {
      _id:      newItem.id,
      name:     newItem.name,
      period:   newItem.period,
      quantity: newItem.quantity,
      comment:  newItem.comment,
      user:     newItem.user
    };
    this.http.post(`${this.resourcesURL}/add`, obj).subscribe(res => console.log('Done'));
  }

  // Aktualizacja oplaty okresowej
  updateResource(updatingItem: HomeBillingItem, oldItemID: string) 
  {
    this.deleteResource(oldItemID);
    this.addResource(updatingItem)
  }

  // Usuniecie oplaty okresowej
  deleteResource(itemID) 
  {
    return this.http.get(`${this.resourcesURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
