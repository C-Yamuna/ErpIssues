import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositRequiredDocumentsComponent } from './recurring-deposit-required-documents.component';

describe('RecurringDepositRequiredDocumentsComponent', () => {
  let component: RecurringDepositRequiredDocumentsComponent;
  let fixture: ComponentFixture<RecurringDepositRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
