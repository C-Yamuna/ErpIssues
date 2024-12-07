import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanGenealogyTreeComponent } from './sao-loan-genealogy-tree.component';

describe('SaoLoanGenealogyTreeComponent', () => {
  let component: SaoLoanGenealogyTreeComponent;
  let fixture: ComponentFixture<SaoLoanGenealogyTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanGenealogyTreeComponent]
    });
    fixture = TestBed.createComponent(SaoLoanGenealogyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
