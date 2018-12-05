import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWerehouseItemDialogComponent } from './add-werehouse-item-dialog.component';

describe('AddWerehouseItemDialogComponent', () => {
  let component: AddWerehouseItemDialogComponent;
  let fixture: ComponentFixture<AddWerehouseItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWerehouseItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWerehouseItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
