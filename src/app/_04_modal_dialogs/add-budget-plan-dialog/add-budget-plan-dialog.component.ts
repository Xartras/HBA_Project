import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BudgetPlanItem } from '../../_01_models/budget-plan-item';
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

  types = ["Zysk", "Koszt", ""]
  periods = this.newBudgetItemDialog.periods
  periodFrom: string;
  periodTo: string;

  get formInput() { return this.addPlanItemForm.controls }

  ngOnInit() 
  {
    this.addPlanItemForm = this.formBuilder.group(
      {
        cType:        new FormControl( this.newBudgetItemDialog.type, Validators.compose([Validators.required] )),
        cCategory:    new FormControl( this.newBudgetItemDialog.category, Validators.compose([Validators.required] )),
        cName:        new FormControl( this.newBudgetItemDialog.name, Validators.compose([Validators.required] )),
        cPeriod:      new FormControl( this.newBudgetItemDialog.period, Validators.compose([Validators.required] )),
        cAmount:      new FormControl( this.newBudgetItemDialog.amount, Validators.compose([Validators.required] )),
        cComment:     new FormControl( this.newBudgetItemDialog.comment)
      }      
    )
  
    this.periods = this.newBudgetItemDialog.periods;
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
          this.addPlanItemForm.controls.cPeriod.value,
          this.addPlanItemForm.controls.cAmount.value,
          this.addPlanItemForm.controls.cComment.value == null ? "" : this.addPlanItemForm.controls.cComment.value,
          ""
        )
        
      this.dialogRef.close(this.newBudgetItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }

  onPeriodChange(event)
  {
    this.periods.forEach(prd =>
      {
        if(prd.id == event.target.value)
        {
          this.periodFrom = "Daty od " + prd.from.toString();
          this.periodTo   = " do " + prd.until.toString();
        }
      })
  }
}
