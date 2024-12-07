import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestProductDefinitionComponent } from './compound-interest-product-definition.component';

describe('CompoundInterestProductDefinitionComponent', () => {
  let component: CompoundInterestProductDefinitionComponent;
  let fixture: ComponentFixture<CompoundInterestProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundInterestProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(CompoundInterestProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
