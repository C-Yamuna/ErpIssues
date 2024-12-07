import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSimpleInterestProductDefinitionComponent } from './view-simple-interest-product-definition.component';

describe('ViewSimpleInterestProductDefinitionComponent', () => {
  let component: ViewSimpleInterestProductDefinitionComponent;
  let fixture: ComponentFixture<ViewSimpleInterestProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSimpleInterestProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewSimpleInterestProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
