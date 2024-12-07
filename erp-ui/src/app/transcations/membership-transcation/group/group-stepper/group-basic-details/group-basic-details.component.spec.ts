import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBasicDetailsComponent } from './group-basic-details.component';

describe('GroupBasicDetailsComponent', () => {
  let component: GroupBasicDetailsComponent;
  let fixture: ComponentFixture<GroupBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(GroupBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
