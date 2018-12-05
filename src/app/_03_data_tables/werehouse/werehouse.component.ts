import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { WerehouseDataSource } from './werehouse-datasource';
import { AddWerehouseItemDialogComponent } from '../../_04_modal_dialogs/add-werehouse-item-dialog/add-werehouse-item-dialog.component'

@Component({
  selector: 'app-werehouse-data',
  templateUrl: './werehouse.component.html',
  styleUrls: ['./werehouse.component.css']
})
export class WerehouseDataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: WerehouseDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'name', 'state', 'actions'];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new WerehouseDataSource(this.paginator, this.sort);
  }


  // Dodawanie wpisu
  btnAddWerehouseItem()
  {
    let dialogRef = this.dialog.open(AddWerehouseItemDialogComponent, 
      {
        data: {category: "", name: "", state: "", title: "Dodaj wpis"}
      })
    
    dialogRef.afterClosed().subscribe(
    result => {
                this.dataSource.addItem(result);
                this.dataSource.connect();
              })        
  }

  btnEditRow(item)
  {
    let dialogRef = this.dialog.open(AddWerehouseItemDialogComponent, 
      {
        data: { 
                category: item.category, 
                name: item.name,
                state: item.state,
                title: "Edytuj wpis"
              }
      })

    dialogRef.afterClosed().subscribe(
      result => {
                  this.dataSource.editItem(item, result);
                  this.dataSource.connect();
                })   
  }
  

  btnRemoveRow(item)
  {
    this.dataSource.removeItem(item);
    this.dataSource.connect();
  }
}
