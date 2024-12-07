import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiKycComponent } from './ci-kyc.component';

describe('CiKycComponent', () => {
  let component: CiKycComponent;
  let fixture: ComponentFixture<CiKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiKycComponent]
    });
    fixture = TestBed.createComponent(CiKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
