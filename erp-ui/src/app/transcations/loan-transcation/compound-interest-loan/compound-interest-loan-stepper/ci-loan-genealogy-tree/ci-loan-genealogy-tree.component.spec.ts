import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiLoanGenealogyTreeComponent } from './ci-loan-genealogy-tree.component';

describe('CiLoanGenealogyTreeComponent', () => {
  let component: CiLoanGenealogyTreeComponent;
  let fixture: ComponentFixture<CiLoanGenealogyTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiLoanGenealogyTreeComponent]
    });
    fixture = TestBed.createComponent(CiLoanGenealogyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
