import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BclassCommunicationsComponent } from './bclass-communications.component';

describe('BclassCommunicationsComponent', () => {
  let component: BclassCommunicationsComponent;
  let fixture: ComponentFixture<BclassCommunicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BclassCommunicationsComponent]
    });
    fixture = TestBed.createComponent(BclassCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
