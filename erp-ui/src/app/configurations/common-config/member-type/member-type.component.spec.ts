import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTypeComponent } from './member-type.component';

describe('MemberTypeComponent', () => {
  let component: MemberTypeComponent;
  let fixture: ComponentFixture<MemberTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberTypeComponent]
    });
    fixture = TestBed.createComponent(MemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
