import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegFormComp } from './log-reg-form.component';

describe('LogRegFormComponent', () => {
  let component: LogRegFormComp;
  let fixture: ComponentFixture<LogRegFormComp>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRegFormComp ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegFormComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
