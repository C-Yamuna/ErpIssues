import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositProductDefinitionComponent } from './term-deposit-product-definition.component';

describe('TermDepositProductDefinitionComponent', () => {
  let component: TermDepositProductDefinitionComponent;
  let fixture: ComponentFixture<TermDepositProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermDepositProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(TermDepositProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
