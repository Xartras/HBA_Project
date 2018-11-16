import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { WerehouseItem } from '../../_models/werehouse-item'
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
        cCategory: new FormControl('', Validators.compose([Validators.required])),
        cName:     new FormControl('', Validators.compose([Validators.required])),
        cState:    new FormControl('', Validators.compose([Validators.required])),
      })
  }

  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addWerehouseItemForm.invalid) { return; }
    else
    {
      this.newWerehouseItemDialog.category = this.addWerehouseItemForm.controls.cCategory.value;
      this.newWerehouseItemDialog.name     = this.addWerehouseItemForm.controls.cName.value;
      this.newWerehouseItemDialog.state    = this.addWerehouseItemForm.controls.cState.value;

      this.newWerehouseItem =  new WerehouseItem('',
        this.newWerehouseItemDialog.category,
        this.newWerehouseItemDialog.name, 
        this.newWerehouseItemDialog.state, 
        )
        
      this.dialogRef.close(this.newWerehouseItem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
