
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDataComponent } from './transactions-data.component';

describe('TransactionsDataComponent', () => {
  let component: TransactionsDataComponent;
  let fixture: ComponentFixture<TransactionsDataComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
