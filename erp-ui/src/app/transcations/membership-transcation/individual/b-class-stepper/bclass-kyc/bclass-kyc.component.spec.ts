import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BclassKYCComponent } from './bclass-kyc.component';

describe('BclassKYCComponent', () => {
  let component: BclassKYCComponent;
  let fixture: ComponentFixture<BclassKYCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BclassKYCComponent]
    });
    fixture = TestBed.createComponent(BclassKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
