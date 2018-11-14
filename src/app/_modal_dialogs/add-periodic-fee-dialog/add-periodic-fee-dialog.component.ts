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
        cCategory:      new FormControl('', Validators.compose([Validators.required])),
        cName:          new FormControl('', Validators.compose([Validators.required])),
        cPaidFrom:      new FormControl('', Validators.compose([Validators.required])),
        cPaidUntil:     new FormControl('', Validators.compose([Validators.required])),
        cPaymentPeriod: new FormControl('', Validators.compose([Validators.required])),
        cIfAlreadyPaid: new FormControl(),
      }
    )
  }



  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addPeriodicFeeForm.invalid) { return; }
    else
    {
      this.newPeriodicFeeDialog.category      = this.addPeriodicFeeForm.controls.cCategory.value;
      this.newPeriodicFeeDialog.name          = this.addPeriodicFeeForm.controls.cName.value;
      this.newPeriodicFeeDialog.paidFrom      = this.addPeriodicFeeForm.controls.cPaidFrom.value;
      this.newPeriodicFeeDialog.paidUntil     = this.addPeriodicFeeForm.controls.cPaidUntil.value;
      this.newPeriodicFeeDialog.paymentPeriod = this.addPeriodicFeeForm.controls.cPaymentPeriod.value;
      this.newPeriodicFeeDialog.ifAlreadyPaid = this.addPeriodicFeeForm.controls.cIfAlreadyPaid.value == null ? false : true;

      this.newFee = new PeriodicFeeItem(''
       ,this.newPeriodicFeeDialog.category, this.newPeriodicFeeDialog.name
       ,this.newPeriodicFeeDialog.paidFrom, this.newPeriodicFeeDialog.paidUntil
       ,this.newPeriodicFeeDialog.paymentPeriod, this.newPeriodicFeeDialog.ifAlreadyPaid
      )

      this.dialogRef.close(this.newFee);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null)
  }
}
