import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsApplicationDetailsComponent } from './investments-application-details.component';

describe('InvestmentsApplicationDetailsComponent', () => {
  let component: InvestmentsApplicationDetailsComponent;
  let fixture: ComponentFixture<InvestmentsApplicationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsApplicationDetailsComponent]
    });
    fixture = TestBed.createComponent(InvestmentsApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
