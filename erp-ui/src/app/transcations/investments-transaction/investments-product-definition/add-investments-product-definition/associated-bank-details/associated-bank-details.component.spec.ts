import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedBankDetailsComponent } from './associated-bank-details.component';

describe('AssociatedBankDetailsComponent', () => {
  let component: AssociatedBankDetailsComponent;
  let fixture: ComponentFixture<AssociatedBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociatedBankDetailsComponent]
    });
    fixture = TestBed.createComponent(AssociatedBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
