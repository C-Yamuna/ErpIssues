import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestmentsProductDefinitionComponent } from './add-investments-product-definition.component';

describe('AddInvestmentsProductDefinitionComponent', () => {
  let component: AddInvestmentsProductDefinitionComponent;
  let fixture: ComponentFixture<AddInvestmentsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvestmentsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddInvestmentsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
