
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicFeesComponent } from './periodic-fees.component';

describe('PeriodicFeesComponent', () => {
  let component: PeriodicFeesComponent;
  let fixture: ComponentFixture<PeriodicFeesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodicFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
