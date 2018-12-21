import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingPlanDialogComponent } from './add-saving-plan-dialog.component';

describe('AddSavingPlanDialogComponent', () => {
  let component: AddSavingPlanDialogComponent;
  let fixture: ComponentFixture<AddSavingPlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSavingPlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSavingPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
