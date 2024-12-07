import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionCommunicationComponent } from './institution-communication.component';

describe('InstitutionCommunicationComponent', () => {
  let component: InstitutionCommunicationComponent;
  let fixture: ComponentFixture<InstitutionCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionCommunicationComponent]
    });
    fixture = TestBed.createComponent(InstitutionCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
