import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SavingPlanItem } from '../../_01_models/saving-plan-item';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-saving-plan-dialog',
  templateUrl: './add-saving-plan-dialog.component.html',
  styleUrls: ['./add-saving-plan-dialog.component.css']
})
export class AddSavingPlanDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<AddSavingPlanDialogComponent>
             ,@Inject(MAT_DIALOG_DATA) public newSavingItemDialog: any) { }

  
  addSavingItemForm : FormGroup;
  newSavingItem : SavingPlanItem;
  isFormSubmitted = false;

  get formInput() { return this.addSavingItemForm.controls }

  ngOnInit() 
  {
    this.addSavingItemForm = this.formBuilder.group(
      {
        cTarget:        new FormControl( this.newSavingItemDialog.target, Validators.compose([Validators.required]) ),
        cPlannedAmount: new FormControl( this.newSavingItemDialog.plannedAmount, Validators.compose( [Validators.required, Validators.min(1)])),
        cGetUntil:      new FormControl( this.newSavingItemDialog.getUntil, Validators.compose([Validators.required])),
        cComment:       new FormControl( this.newSavingItemDialog.comment )
      }
    )
  }

  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addSavingItemForm.invalid) { return; }
    else
    {
      this.newSavingItem =  
        new SavingPlanItem
        ( '',
          this.addSavingItemForm.controls.cTarget.value,
          this.addSavingItemForm.controls.cPlannedAmount.value,
          0,
          this.addSavingItemForm.controls.cGetUntil.value,
          this.addSavingItemForm.controls.cComment.value,
          ""
        )
        
      this.dialogRef.close(this.newSavingItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
