import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodicFeeDialogComponent } from './add-periodic-fee-dialog.component';

describe('AddPeriodicFeeDialogComponent', () => {
  let component: AddPeriodicFeeDialogComponent;
  let fixture: ComponentFixture<AddPeriodicFeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeriodicFeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeriodicFeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
