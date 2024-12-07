import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeCommunicationComponent } from './fd-cumulative-communication.component';

describe('FdNonCumulativeCommunicationComponent', () => {
  let component: FdCumulativeCommunicationComponent;
  let fixture: ComponentFixture<FdCumulativeCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeCommunicationComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
