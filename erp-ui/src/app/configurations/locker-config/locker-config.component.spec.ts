import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerConfigComponent } from './locker-config.component';

describe('LockerConfigComponent', () => {
  let component: LockerConfigComponent;
  let fixture: ComponentFixture<LockerConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockerConfigComponent]
    });
    fixture = TestBed.createComponent(LockerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
