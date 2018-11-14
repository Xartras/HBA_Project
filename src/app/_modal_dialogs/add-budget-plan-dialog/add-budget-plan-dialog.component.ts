import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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

  get formInput() { return this.addPlanItemForm.controls }

  ngOnInit() 
  {
    this.addPlanItemForm = this.formBuilder.group(
      {
        cType:     new FormControl( '', Validators.compose([Validators.required] )),
        cCategory: new FormControl( '', Validators.compose([Validators.required] )),
        cName:     new FormControl( '', Validators.compose([Validators.required] )),
        cAmount:   new FormControl( '', Validators.compose([Validators.required] )),
        cComment:  new FormControl()
      }
    )
  }  
 
  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addPlanItemForm.invalid) { return; }
    else
    {
      this.newBudgetItemDialog.type     = this.addPlanItemForm.controls.cType.value;
      this.newBudgetItemDialog.category = this.addPlanItemForm.controls.cCategory.value;
      this.newBudgetItemDialog.name     = this.addPlanItemForm.controls.cName.value;
      this.newBudgetItemDialog.amount   = this.addPlanItemForm.controls.cAmount.value;
      this.newBudgetItemDialog.comment  = this.addPlanItemForm.controls.cComment.value == null ? "" : this.addPlanItemForm.controls.cComment.value;

      this.newBudgetItem =  new BudgetPlanItem('',
        this.newBudgetItemDialog.type, this.newBudgetItemDialog.category,
        this.newBudgetItemDialog.name, this.newBudgetItemDialog.amount, 
        this.newBudgetItemDialog.comment
        )
        
      this.dialogRef.close(this.newBudgetItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
