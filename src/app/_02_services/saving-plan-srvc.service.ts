import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingPlanItem } from '../_01_models/saving-plan-item';
import { updateClassProp, updateStylingMap } from '@angular/core/src/render3/styling';

@Injectable({
  providedIn: 'root'
})
export class SavingPlanService {

  constructor(private http: HttpClient) { }

  savingPlanURL = 'http://localhost:4000/SavingPlan';

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
    this.http.post(`${this.savingPlanURL}/add`, obj).subscribe(res => console.log('Done'));
  }

  // Aktualizacja planu oszczednosciowego
  updateSavingPlan(updatingItem: SavingPlanItem, id) 
  {
    console.log(id);
    const obj = {
      _id:           id,
      target:        updatingItem.target,
      plannedAmount: updatingItem.plannedAmount,
      currentAmount: updatingItem.currentAmount,
      getUntil:      updatingItem.getUntil,
      commnet:       updatingItem.comment,
      user:          updatingItem.user
    };
    console.log(obj);
    console.log(updatingItem)
    this.http.post(`${this.savingPlanURL}/update/${id}`, obj).subscribe(res => console.log('Done'));
  }

  // Usuniecie planu oszczednosciowego
  deleteSavingPlan(itemID) 
  {
    return this.http.get(`${this.savingPlanURL}/delete/${itemID}`).subscribe(res => console.log('Done'));;
  }
}
