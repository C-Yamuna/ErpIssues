import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompoundInterestProductDefinitionComponent } from './view-compound-interest-product-definition.component';

describe('ViewCompoundInterestProductDefinitionComponent', () => {
  let component: ViewCompoundInterestProductDefinitionComponent;
  let fixture: ComponentFixture<ViewCompoundInterestProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompoundInterestProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewCompoundInterestProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
