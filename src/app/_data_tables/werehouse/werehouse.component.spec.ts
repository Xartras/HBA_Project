
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WerehouseDataComponent } from './werehouse.component';

describe('WerehouseComponent', () => {
  let component: WerehouseDataComponent;
  let fixture: ComponentFixture<WerehouseDataComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WerehouseDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerehouseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
