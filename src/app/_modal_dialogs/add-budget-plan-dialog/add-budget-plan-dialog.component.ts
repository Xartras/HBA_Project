import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  btnSaveNewItem()
  {
    this.dialogRef.close("Just Closed");
  }

}
