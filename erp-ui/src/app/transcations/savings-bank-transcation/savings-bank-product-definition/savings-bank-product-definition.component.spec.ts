import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankProductDefinitionComponent } from './savings-bank-product-definition.component';

describe('SavingsBankProductDefinitionComponent', () => {
  let component: SavingsBankProductDefinitionComponent;
  let fixture: ComponentFixture<SavingsBankProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(SavingsBankProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
