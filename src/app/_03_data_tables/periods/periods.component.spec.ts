
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodsComponent } from './periods.component';

describe('PeriodsComponent', () => {
  let component: PeriodsComponent;
  let fixture: ComponentFixture<PeriodsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
