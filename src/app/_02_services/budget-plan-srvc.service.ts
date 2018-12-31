import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetPlanItem } from '../_01_models/budget-plan-item';

@Injectable({
  providedIn: 'root'
})
export class BudgetPlanService {

  budgetPlanURL = 'http://localhost:4000/BudgetPlan';

  constructor(private http: HttpClient) { }

  // Pobranie planu budzetowego
  getBudgetPlan() { return this.http.get(`${this.budgetPlanURL}`) }


  // Dodanie planu do bazy
  addBudgetPlan(newItem: BudgetPlanItem) {
    const obj = 
    {
      _id:      newItem.id,
      type:     newItem.type,
      category: newItem.category,
      name:     newItem.name,
      period:   newItem.period,
      amount:   newItem.amount,
      comment:  newItem.comment,
      user:     newItem.user

    };
    this.http.post(`${this.budgetPlanURL}/add`, obj).subscribe(res => console.log('Dodano plan budzetowy', res));
  }

  // Aktualizacja planu w bazie
  updateBudgetPlan(updatingItem: BudgetPlanItem) 
  {
    this.deleteBudgetPlanItem(updatingItem.id);
    this.addBudgetPlan(updatingItem);
  }

  // Usuniecie planu z bazy
  deleteBudgetPlanItem(itemID) 
  {
    return this.http.get(`${this.budgetPlanURL}/delete/${itemID}`).subscribe(res => console.log('Usunieto plan budzetowy'));;
  }
}
