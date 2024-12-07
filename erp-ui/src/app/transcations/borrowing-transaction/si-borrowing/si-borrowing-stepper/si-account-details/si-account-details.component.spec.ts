import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiAccountDetailsComponent } from './si-account-details.component';

describe('SiAccountDetailsComponent', () => {
  let component: SiAccountDetailsComponent;
  let fixture: ComponentFixture<SiAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(SiAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
