import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebillingsComponent } from './homebillings.component';

describe('HomebillingsComponent', () => {
  let component: HomebillingsComponent;
  let fixture: ComponentFixture<HomebillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
