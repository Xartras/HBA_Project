import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WerehouseItem } from '../../_01_models/werehouse-item'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-werehouse-item-dialog',
  templateUrl: './add-werehouse-item-dialog.component.html',
  styleUrls: ['./add-werehouse-item-dialog.component.css']
})
export class AddWerehouseItemDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<AddWerehouseItemDialogComponent>
             ,@Inject(MAT_DIALOG_DATA) public newWerehouseItemDialog: any
             ) { }

  addWerehouseItemForm : FormGroup;
  newWerehouseItem: WerehouseItem;
  isFormSubmitted = false;

  get formInput() { return this.addWerehouseItemForm.controls }

  ngOnInit() 
  {
    this.addWerehouseItemForm = this.formBuilder.group(
      {
        cCategory: new FormControl(this.newWerehouseItemDialog.category, Validators.compose([Validators.required])),
        cName:     new FormControl(this.newWerehouseItemDialog.name, Validators.compose([Validators.required])),
        cState:    new FormControl(this.newWerehouseItemDialog.state, Validators.compose([Validators.required])),
      })
  }

  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addWerehouseItemForm.invalid) { return; }
    else
    {
      this.newWerehouseItem =  
      new WerehouseItem
      (
      ''
      ,this.addWerehouseItemForm.controls.cCategory.value
      ,this.addWerehouseItemForm.controls.cName.value
      ,this.addWerehouseItemForm.controls.cState.value 
      )
        
      this.dialogRef.close(this.newWerehouseItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
