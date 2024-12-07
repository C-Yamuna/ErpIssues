import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsForeclosureComponent } from './investments-foreclosure.component';

describe('InvestmentsForeclosureComponent', () => {
  let component: InvestmentsForeclosureComponent;
  let fixture: ComponentFixture<InvestmentsForeclosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsForeclosureComponent]
    });
    fixture = TestBed.createComponent(InvestmentsForeclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
