import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetPlanDialogComponent } from './add-budget-plan-dialog.component';

describe('AddBudgetPlanDialogComponent', () => {
  let component: AddBudgetPlanDialogComponent;
  let fixture: ComponentFixture<AddBudgetPlanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBudgetPlanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
