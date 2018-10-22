import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BudgetPlanItem } from '../../_models/budget-plan-item'

@Component({
  selector: 'app-add-budget-plan-dialog',
  templateUrl: './add-budget-plan-dialog.component.html',
  styleUrls: ['./add-budget-plan-dialog.component.css']
})
export class AddBudgetPlanDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBudgetPlanDialogComponent>
    ) { }

  ngOnInit() {
  }

  newBudgetItem : BudgetPlanItem = new BudgetPlanItem("", "", "", 0, "")


  btnSaveNewItem()
  {
    this.dialogRef.close(this.newBudgetItem);
  }

}
