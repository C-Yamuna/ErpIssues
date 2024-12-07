import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCommunicationComponent } from './group-communication.component';

describe('GroupCommunicationComponent', () => {
  let component: GroupCommunicationComponent;
  let fixture: ComponentFixture<GroupCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCommunicationComponent]
    });
    fixture = TestBed.createComponent(GroupCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
