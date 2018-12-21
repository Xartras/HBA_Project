
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingPlanComponent } from './saving-plan.component';

describe('SavingPlanComponent', () => {
  let component: SavingPlanComponent;
  let fixture: ComponentFixture<SavingPlanComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
