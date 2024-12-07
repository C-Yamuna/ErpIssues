import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestmentsProductDefinitionComponent } from './view-investments-product-definition.component';

describe('ViewInvestmentsProductDefinitionComponent', () => {
  let component: ViewInvestmentsProductDefinitionComponent;
  let fixture: ComponentFixture<ViewInvestmentsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInvestmentsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewInvestmentsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
