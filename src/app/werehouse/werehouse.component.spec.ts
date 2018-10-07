import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WerehouseComponent } from './werehouse.component';

describe('WerehouseComponent', () => {
  let component: WerehouseComponent;
  let fixture: ComponentFixture<WerehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WerehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WerehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
