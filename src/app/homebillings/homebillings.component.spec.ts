import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBillingsComponent } from './homebillings.component';

describe('HomebillingsComponent', () => {
  let component: HomeBillingsComponent;
  let fixture: ComponentFixture<HomeBillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBillingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
