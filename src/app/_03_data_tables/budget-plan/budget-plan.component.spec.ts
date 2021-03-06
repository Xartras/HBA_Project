
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPlanComponent } from './budget-plan.component';

describe('BudgetPlanComponent', () => {
  let component: BudgetPlanComponent;
  let fixture: ComponentFixture<BudgetPlanComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
