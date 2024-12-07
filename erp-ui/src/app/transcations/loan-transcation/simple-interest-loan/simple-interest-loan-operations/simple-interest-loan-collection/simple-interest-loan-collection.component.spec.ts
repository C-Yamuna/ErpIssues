import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestLoanCollectionComponent } from './simple-interest-loan-collection.component';

describe('SimpleInterestLoanCollectionComponent', () => {
  let component: SimpleInterestLoanCollectionComponent;
  let fixture: ComponentFixture<SimpleInterestLoanCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestLoanCollectionComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestLoanCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
