import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterConfigComponent } from './voter-config.component';

describe('VoterConfigComponent', () => {
  let component: VoterConfigComponent;
  let fixture: ComponentFixture<VoterConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterConfigComponent]
    });
    fixture = TestBed.createComponent(VoterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
