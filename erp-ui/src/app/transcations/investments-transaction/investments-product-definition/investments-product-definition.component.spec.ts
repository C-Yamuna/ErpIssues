import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsProductDefinitionComponent } from './investments-product-definition.component';

describe('InvestmentsProductDefinitionComponent', () => {
  let component: InvestmentsProductDefinitionComponent;
  let fixture: ComponentFixture<InvestmentsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(InvestmentsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
