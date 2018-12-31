import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingPlanItem } from '../_01_models/saving-plan-item';

@Injectable({
  providedIn: 'root'
})
export class SavingPlanService {

  constructor(private http: HttpClient) { }

  savingPlanURL = 'http://localhost:4000/SavingPlan';

  // Pobranie planu oszczednosiowego
  getSavingPlan() { return this.http.get(`${this.savingPlanURL}`) }

  // Dodanie planu oszczednosciowego
  addSavingPlan(newItem: SavingPlanItem) 
  {
    const obj = 
    {
      _id:           newItem.id,
      target:        newItem.target,
      plannedAmount: newItem.plannedAmount,
      currentAmount: newItem.currentAmount,
      getUntil:      newItem.getUntil,
      comment:       newItem.comment,
      user:          newItem.user
    };
    this.http.post(`${this.savingPlanURL}/add`, obj).subscribe(res => console.log('Dodano plan oszczednosciowy'));
  }

  // Aktualizacja planu oszczednosciowego
  updateSavingPlan(updatingItem: SavingPlanItem) 
  {
    this.deleteSavingPlan(updatingItem.id);
    this.addSavingPlan(updatingItem);
  }

  // Usuniecie planu oszczednosciowego
  deleteSavingPlan(itemID) 
  {
    return this.http.get(`${this.savingPlanURL}/delete/${itemID}`).subscribe(res => console.log('Usunieto plan oszczednosciowy'));;
  }
}
