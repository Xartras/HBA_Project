import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { SavingPlanService } from '../../_02_services/saving-plan-srvc.service';

/**
 * Data source for the SavingPlan view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SavingPlanDataSource extends DataSource<SavingPlanItem> {

  constructor(private savingPlan : Observable<SavingPlanItem[]>
             ,private serviceSP: SavingPlanService) { super(); }

      
  // Generowanie ID dla nowego planu oszczednosciowego
  calculateID(data: SavingPlanItem[], item: SavingPlanItem) : string
  {
    let newID = ""

    return newID;
  }

  // Aktualizowanie wpisow po usunieciu jednego z planow
  private updateIDs(data: SavingPlanItem[], item: SavingPlanItem)
  {

  }

  // Dodawanie wpisu
  addItem(data: SavingPlanItem[], item: SavingPlanItem)
  {

  }

  // Usuwanie wpisu
  removeItem(data: SavingPlanItem[], item: SavingPlanItem)
  {

  }

  // Edycja wpisu
  updateItem(data: SavingPlanItem[], item: SavingPlanItem)
  {

  }

  // Metoda zwraca dane, które powinny zostać wyświetlone
  connect(): Observable<SavingPlanItem[]> { return this.savingPlan }


  // Metoda do usuwania tabeli
  disconnect() {}
}