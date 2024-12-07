import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiCommunicationComponent } from './si-communication.component';

describe('SiCommunicationComponent', () => {
  let component: SiCommunicationComponent;
  let fixture: ComponentFixture<SiCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiCommunicationComponent]
    });
    fixture = TestBed.createComponent(SiCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
