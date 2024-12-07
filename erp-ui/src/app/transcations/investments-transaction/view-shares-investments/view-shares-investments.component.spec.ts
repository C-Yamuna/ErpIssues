import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSharesInvestmentsComponent } from './view-shares-investments.component';

describe('ViewSharesInvestmentsComponent', () => {
  let component: ViewSharesInvestmentsComponent;
  let fixture: ComponentFixture<ViewSharesInvestmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSharesInvestmentsComponent]
    });
    fixture = TestBed.createComponent(ViewSharesInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
