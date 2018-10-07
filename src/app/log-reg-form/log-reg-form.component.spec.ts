import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRegFormComponent } from './log-reg-form.component';

describe('LogRegFormComponent', () => {
  let component: LogRegFormComponent;
  let fixture: ComponentFixture<LogRegFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRegFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
