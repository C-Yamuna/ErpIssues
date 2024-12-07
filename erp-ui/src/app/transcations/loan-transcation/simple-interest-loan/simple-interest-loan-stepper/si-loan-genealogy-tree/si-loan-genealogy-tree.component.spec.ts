import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanGenealogyTreeComponent } from './si-loan-genealogy-tree.component';

describe('SiLoanGenealogyTreeComponent', () => {
  let component: SiLoanGenealogyTreeComponent;
  let fixture: ComponentFixture<SiLoanGenealogyTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanGenealogyTreeComponent]
    });
    fixture = TestBed.createComponent(SiLoanGenealogyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
