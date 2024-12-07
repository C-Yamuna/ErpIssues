import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiCommunicationComponent } from './ci-communication.component';

describe('CiCommunicationComponent', () => {
  let component: CiCommunicationComponent;
  let fixture: ComponentFixture<CiCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiCommunicationComponent]
    });
    fixture = TestBed.createComponent(CiCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
