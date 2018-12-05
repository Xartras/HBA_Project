import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeBillingItemDialogComponent } from './add-home-billing-item-dialog.component';

describe('AddHomeBillingItemDialogComponent', () => {
  let component: AddHomeBillingItemDialogComponent;
  let fixture: ComponentFixture<AddHomeBillingItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeBillingItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeBillingItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
