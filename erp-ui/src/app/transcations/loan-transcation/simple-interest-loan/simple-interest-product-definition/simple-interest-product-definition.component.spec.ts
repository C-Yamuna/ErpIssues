import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestProductDefinitionComponent } from './simple-interest-product-definition.component';

describe('SimpleInterestProductDefinitionComponent', () => {
  let component: SimpleInterestProductDefinitionComponent;
  let fixture: ComponentFixture<SimpleInterestProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
