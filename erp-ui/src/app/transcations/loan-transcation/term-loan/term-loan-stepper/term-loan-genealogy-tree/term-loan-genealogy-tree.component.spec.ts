import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanGenealogyTreeComponent } from './term-loan-genealogy-tree.component';

describe('TermLoanGenealogyTreeComponent', () => {
  let component: TermLoanGenealogyTreeComponent;
  let fixture: ComponentFixture<TermLoanGenealogyTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanGenealogyTreeComponent]
    });
    fixture = TestBed.createComponent(TermLoanGenealogyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
