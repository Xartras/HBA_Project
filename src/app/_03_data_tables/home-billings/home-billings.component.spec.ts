
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBillingsDataComponent } from './home-billings.component';

describe('HomeBillingsComponent', () => {
  let component: HomeBillingsDataComponent;
  let fixture: ComponentFixture<HomeBillingsDataComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBillingsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBillingsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
