import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLockerConfigsComponent } from './add-locker-configs.component';

describe('AddLockerConfigsComponent', () => {
  let component: AddLockerConfigsComponent;
  let fixture: ComponentFixture<AddLockerConfigsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLockerConfigsComponent]
    });
    fixture = TestBed.createComponent(AddLockerConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
