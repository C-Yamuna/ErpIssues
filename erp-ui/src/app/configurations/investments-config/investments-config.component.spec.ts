import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsConfigComponent } from './investments-config.component';

describe('InvestmentsConfigComponent', () => {
  let component: InvestmentsConfigComponent;
  let fixture: ComponentFixture<InvestmentsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsConfigComponent]
    });
    fixture = TestBed.createComponent(InvestmentsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
