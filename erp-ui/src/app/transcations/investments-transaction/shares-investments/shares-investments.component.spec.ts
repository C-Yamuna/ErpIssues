import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharesInvestmentsComponent } from './shares-investments.component';

describe('SharesInvestmentsComponent', () => {
  let component: SharesInvestmentsComponent;
  let fixture: ComponentFixture<SharesInvestmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharesInvestmentsComponent]
    });
    fixture = TestBed.createComponent(SharesInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
