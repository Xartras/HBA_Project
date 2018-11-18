import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeriodicFeeItem } from '../../_models/periodic-fee-item';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  newFee : PeriodicFeeItem;
  addPeriodicFeeForm : FormGroup;
  isFormSubmitted = false;

  get formInput() { return this.addPeriodicFeeForm.controls }

  ngOnInit() 
  {
    this.addPeriodicFeeForm = this.formBuilder.group(
      {
        cCategory:      new FormControl(this.newPeriodicFeeDialog.category , Validators.compose([Validators.required])),
        cName:          new FormControl(this.newPeriodicFeeDialog.name, Validators.compose([Validators.required])),
        cPaidFrom:      new FormControl(this.newPeriodicFeeDialog.paidFrom , Validators.compose([Validators.required])),
        cPaidUntil:     new FormControl(this.newPeriodicFeeDialog.paidUntil, Validators.compose([Validators.required])),
        cPaymentPeriod: new FormControl(this.newPeriodicFeeDialog.paymentPeriod, Validators.compose([Validators.required])),
        cIfAlreadyPaid: new FormControl(this.newPeriodicFeeDialog.ifAlreadyPaid),
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
      (''
      ,this.addPeriodicFeeForm.controls.cCategory.value
      ,this.addPeriodicFeeForm.controls.cName.value
      ,this.addPeriodicFeeForm.controls.cPaidFrom.value
      ,this.addPeriodicFeeForm.controls.cPaidUntil.value
      ,this.addPeriodicFeeForm.controls.cPaymentPeriod.value
      ,this.addPeriodicFeeForm.controls.cIfAlreadyPaid.value == null ? false : true
      )

      this.dialogRef.close(this.newFee);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null)
  }
}
