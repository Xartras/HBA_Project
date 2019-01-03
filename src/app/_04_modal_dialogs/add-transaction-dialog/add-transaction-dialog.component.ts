import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionItem } from '../../_01_models/transaction-item';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.component.html',
  styleUrls: ['./add-transaction-dialog.component.css']
})
export class AddTransactionDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
    ,public dialogRef: MatDialogRef<AddTransactionDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public newTransactionDialog: any
    ) { }

  addTransactionForm : FormGroup;
  newTransaction : TransactionItem;
  isFormSubmitted = false;
  cType: FormControl;
  types = ["Zysk", "Koszt", ""]
  periods = [{period: "01_2018", from: "27-09-2018", to: "26-10-2018"}, {period: "02_2018", from: "27-10-2018", to: "26-11-2018"}]

  ngOnInit() 
  {
    this.addTransactionForm = this.formBuilder.group(
      {
        cType:        new FormControl( this.newTransactionDialog.type,      Validators.compose([Validators.required] )),
        cSubType:     new FormControl( this.newTransactionDialog.subType,   Validators.compose([Validators.required] )),
        cCategory:    new FormControl( this.newTransactionDialog.category,  Validators.compose([Validators.required] )),
        cName:        new FormControl( this.newTransactionDialog.name,      Validators.compose([Validators.required] )),
        cAmount:      new FormControl( this.newTransactionDialog.amount,    Validators.compose([Validators.required] )),
        cDescription: new FormControl( this.newTransactionDialog.description ),
        cAccounted:   new FormControl( formatDate(this.newTransactionDialog.accounted, "yyyy-MM-dd", "en-en"), Validators.compose([Validators.required] )),
        cEntered:     new FormControl( formatDate(this.newTransactionDialog.entered, "yyyy-MM-dd", "en-en"),   Validators.compose([Validators.required] )),
        cPeriod:      new FormControl( this.newTransactionDialog.period,    Validators.compose([Validators.required] )),
        cComment:     new FormControl( this.newTransactionDialog.comment )
      })  
  }

  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addTransactionForm.invalid) { return; }
    else
    {
      this.newTransaction =  
        new TransactionItem
        ( '',
          this.addTransactionForm.controls.cType.value,
          this.addTransactionForm.controls.cSubType.value,
          this.addTransactionForm.controls.cCategory.value,
          this.addTransactionForm.controls.cName.value,
          this.addTransactionForm.controls.cAmount.value,
          this.addTransactionForm.controls.cDescription.value == null ? "" : this.addTransactionForm.controls.cDescription.value,
          this.addTransactionForm.controls.cAccounted.value,
          this.addTransactionForm.controls.cEntered.value,
          this.addTransactionForm.controls.cPeriod.value,
          this.addTransactionForm.controls.cComment.value == null ? "" : this.addTransactionForm.controls.cComment.value,
          ""
        )
        
      this.dialogRef.close(this.newTransaction);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
