import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoCommunicationComponent } from './sao-communication.component';

describe('SaoCommunicationComponent', () => {
  let component: SaoCommunicationComponent;
  let fixture: ComponentFixture<SaoCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoCommunicationComponent]
    });
    fixture = TestBed.createComponent(SaoCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
