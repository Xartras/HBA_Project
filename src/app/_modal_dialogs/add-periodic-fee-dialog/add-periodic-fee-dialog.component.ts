import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeriodicFeeItem } from '../../_models/periodic-fee-item';

@Component({
  selector: 'app-add-periodic-fee-dialog',
  templateUrl: './add-periodic-fee-dialog.component.html',
  styleUrls: ['./add-periodic-fee-dialog.component.css']
})
export class AddPeriodicFeeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPeriodicFeeDialogComponent>
             ) { }

  ngOnInit() {
  }

  newFee : PeriodicFeeItem = new PeriodicFeeItem("", "", null, null, "", false)

  btnSaveNewItem()
  {
    this.dialogRef.close(this.newFee);
  }
}
