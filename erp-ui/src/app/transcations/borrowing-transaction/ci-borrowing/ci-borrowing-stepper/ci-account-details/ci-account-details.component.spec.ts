import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiAccountDetailsComponent } from './ci-account-details.component';

describe('CiAccountDetailsComponent', () => {
  let component: CiAccountDetailsComponent;
  let fixture: ComponentFixture<CiAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(CiAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
