import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { SavingPlanService } from '../../_02_services/saving-plan-srvc.service';


export class SavingPlanDataSource extends DataSource<SavingPlanItem> {

  constructor(private savingPlan : Observable<SavingPlanItem[]>
             ,private serviceSP: SavingPlanService) { super(); }

             
  // Dodawanie wpisu
  addItem(data: SavingPlanItem[], item: SavingPlanItem)
  {
    item.id = this.calculateID(data, item);
    this.serviceSP.addSavingPlan(item);
    data.push(item);
  }

  // Generowanie ID dla nowego planu oszczednosciowego
  calculateID(data: SavingPlanItem[], item: SavingPlanItem) : string
  {
    let newID = "";
    let idNumber = 1;

    if( data.length < 1) newID = idNumber.toString() + "_" + item.target + "_" + item.user;
    else
    {
      for( let i = 0; i < data.length; i++)
      {
        if( item.target == data[i].target )
        idNumber++
      }

      newID = idNumber.toString() + "_" + item.target + "_" + item.user;
    }

    return newID;
  }

  // Edycja wpisu
  editItem(data: SavingPlanItem[], oldItem: SavingPlanItem, newItem: SavingPlanItem)
  {
    if(oldItem.target != newItem.target)
      newItem.id = this.updateIdOnEdit(data, newItem);
      
    this.serviceSP.updateSavingPlan(newItem);
    data[data.indexOf(oldItem)] = newItem;
  }

  // Usuwanie wpisu
  removeItem(data: SavingPlanItem[], item: SavingPlanItem)
  {
    this.serviceSP.deleteSavingPlan(item.id);
    if(data.length > 1) this.updateIdOnRemove(data, item);
    data.splice(data.indexOf(item), 1);
  }

  // Aktualizowanie ID po usunieciu wpisu
  private updateIdOnRemove(data: SavingPlanItem[], item: SavingPlanItem)
  {
    let oldID : String;
    data.forEach(element => 
      { 
        if( element.target == item.target && parseInt(element.id.split("_")[0]) > parseInt(item.id.split("_")[0]) )
        { 
          oldID = element.id;
          element.id = (parseInt(element.id.split("_")[0]) - 1).toString() + "_" + item.target + "_" + item.user

          this.serviceSP.deleteSavingPlan(oldID);
          this.serviceSP.addSavingPlan(element);
        }
    });
  }

  // Aktualizowanie ID po edycji wpisu
  private updateIdOnEdit(data: SavingPlanItem[], item: SavingPlanItem) : string
  {
    let updtdId = "";
    let idNumber = 1;

    data.forEach(element =>
      {
        if(element.target == item.target )
        { idNumber++ }
      })
    
      updtdId = idNumber.toString() + "_" + item.target + "_" + item.user;

      return updtdId; 
  }

  // Metoda zwraca dane, które powinny zostać wyświetlone w przeglądarce
  connect(): Observable<SavingPlanItem[]> { return this.savingPlan }


  // Metoda do usuwania tabeli
  disconnect() {}
}