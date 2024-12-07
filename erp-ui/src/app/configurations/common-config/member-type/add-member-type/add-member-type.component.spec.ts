import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberTypeComponent } from './add-member-type.component';

describe('AddMemberTypeComponent', () => {
  let component: AddMemberTypeComponent;
  let fixture: ComponentFixture<AddMemberTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMemberTypeComponent]
    });
    fixture = TestBed.createComponent(AddMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
