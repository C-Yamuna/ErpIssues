import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySuretyComponent } from './security-surety.component';

describe('SecuritySuretyComponent', () => {
  let component: SecuritySuretyComponent;
  let fixture: ComponentFixture<SecuritySuretyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecuritySuretyComponent]
    });
    fixture = TestBed.createComponent(SecuritySuretyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
