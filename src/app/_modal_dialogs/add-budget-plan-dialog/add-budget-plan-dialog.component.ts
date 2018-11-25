import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BudgetPlanItem } from '../../_models/budget-plan-item';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-budget-plan-dialog',
  templateUrl: './add-budget-plan-dialog.component.html',
  styleUrls: ['./add-budget-plan-dialog.component.css']
})
export class AddBudgetPlanDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<AddBudgetPlanDialogComponent>
             ,@Inject(MAT_DIALOG_DATA) public newBudgetItemDialog: any
             ) { }

  addPlanItemForm : FormGroup;
  newBudgetItem : BudgetPlanItem;
  isFormSubmitted = false;
  cType: FormControl;

  types = [{type: "Zysk"}, {type: "Koszt"}, {type: ""}]

  get formInput() { return this.addPlanItemForm.controls }

  ngOnInit() 
  {
    this.addPlanItemForm = this.formBuilder.group(
      {
        cType:        new FormControl( this.newBudgetItemDialog.type, Validators.compose([Validators.required] )),
        cCategory:    new FormControl( this.newBudgetItemDialog.category, Validators.compose([Validators.required] )),
        cName:        new FormControl( this.newBudgetItemDialog.name, Validators.compose([Validators.required] )),
        cPeriodBegin: new FormControl( this.newBudgetItemDialog.periodBegin, Validators.compose([Validators.required] )),
        cPeriodEnd:   new FormControl( this.newBudgetItemDialog.periodEnd, Validators.compose([Validators.required] )),
        cAmount:      new FormControl( this.newBudgetItemDialog.amount, Validators.compose([Validators.required] )),
        cComment:     new FormControl( this.newBudgetItemDialog.comment)
      }      
    )
  }  
 
  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addPlanItemForm.invalid) { return; }
    else
    {
      this.newBudgetItem =  
        new BudgetPlanItem
        ('',
          this.addPlanItemForm.controls.cType.value,
          this.addPlanItemForm.controls.cCategory.value,
          this.addPlanItemForm.controls.cName.value,
          this.addPlanItemForm.controls.cPeriodBegin.value,
          this.addPlanItemForm.controls.cPeriodEnd.value,
          this.addPlanItemForm.controls.cAmount.value,
          this.addPlanItemForm.controls.cComment.value == null ? "" : this.addPlanItemForm.controls.cComment.value
        )
        
      this.dialogRef.close(this.newBudgetItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
