import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeCommunicationComponent } from './fd-non-cumulative-communication.component';

describe('FdNonCumulativeCommunicationComponent', () => {
  let component: FdNonCumulativeCommunicationComponent;
  let fixture: ComponentFixture<FdNonCumulativeCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeCommunicationComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
