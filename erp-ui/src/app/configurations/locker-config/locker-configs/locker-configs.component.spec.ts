import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerConfigsComponent } from './locker-configs.component';

describe('LockerConfigsComponent', () => {
  let component: LockerConfigsComponent;
  let fixture: ComponentFixture<LockerConfigsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockerConfigsComponent]
    });
    fixture = TestBed.createComponent(LockerConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
