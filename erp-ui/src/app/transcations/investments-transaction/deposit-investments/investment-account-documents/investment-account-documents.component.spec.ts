import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAccountDocumentsComponent } from './investment-account-documents.component';

describe('InvestmentAccountDocumentsComponent', () => {
  let component: InvestmentAccountDocumentsComponent;
  let fixture: ComponentFixture<InvestmentAccountDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentAccountDocumentsComponent]
    });
    fixture = TestBed.createComponent(InvestmentAccountDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
