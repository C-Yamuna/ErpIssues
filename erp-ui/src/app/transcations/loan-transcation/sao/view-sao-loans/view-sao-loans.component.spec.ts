import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaoLoansComponent } from './view-sao-loans.component';

describe('ViewSaoLoansComponent', () => {
  let component: ViewSaoLoansComponent;
  let fixture: ComponentFixture<ViewSaoLoansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSaoLoansComponent]
    });
    fixture = TestBed.createComponent(ViewSaoLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
