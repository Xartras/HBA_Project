import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PeriodicFeeItem } from '../../_01_models/periodic-fee-item';


@Component({
  selector: 'app-add-periodic-fee-dialog',
  templateUrl: './add-periodic-fee-dialog.component.html',
  styleUrls: ['./add-periodic-fee-dialog.component.css']
})
export class AddPeriodicFeeDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<AddPeriodicFeeDialogComponent>
             ,@Inject(MAT_DIALOG_DATA) public newPeriodicFeeDialog: any
             ) { }

  private newFee : PeriodicFeeItem;
  addPeriodicFeeForm : FormGroup;
  isFormSubmitted = false;


  get formInput() { return this.addPeriodicFeeForm.controls }

  ngOnInit() 
  {
    this.addPeriodicFeeForm = this.formBuilder.group(
      {
        cCategory:        new FormControl(this.newPeriodicFeeDialog.category , Validators.compose([Validators.required])),
        cName:            new FormControl(this.newPeriodicFeeDialog.name, Validators.compose([Validators.required])),
        cPaidUntil:       new FormControl(<number>this.newPeriodicFeeDialog.paidUntil.split(" ")[0], Validators.compose([Validators.required, Validators.min(1), Validators.max(31)])),
        cPaymentPeriod:   new FormControl(this.newPeriodicFeeDialog.paymentPeriod, Validators.compose([Validators.required])),
        cPaymentDeadline: new FormControl(this.newPeriodicFeeDialog.paymentDeadline),
        cWarnings:        new FormControl(this.newPeriodicFeeDialog.warnings),
      }
    )
  }

  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addPeriodicFeeForm.invalid) { return; }
    else
    {
      this.newFee = new PeriodicFeeItem
      (
       ""
      ,this.addPeriodicFeeForm.controls.cCategory.value
      ,this.addPeriodicFeeForm.controls.cName.value
      ,this.addPeriodicFeeForm.controls.cPaidUntil.value.toString() + " dnia miesiąca"
      ,this.addPeriodicFeeForm.controls.cPaymentPeriod.value
      ,this.addPeriodicFeeForm.controls.cPaymentDeadline.value
      ,this.addPeriodicFeeForm.controls.cWarnings.value
      )
      this.dialogRef.close(this.newFee);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null)
  }
}
