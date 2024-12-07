import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestProductConfigurationComponent } from './simple-interest-product-configuration.component';

describe('SimpleInterestProductConfigurationComponent', () => {
  let component: SimpleInterestProductConfigurationComponent;
  let fixture: ComponentFixture<SimpleInterestProductConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestProductConfigurationComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestProductConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
