import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingInstructionComponent } from './standing-instruction.component';

describe('StandingInstructionComponent', () => {
  let component: StandingInstructionComponent;
  let fixture: ComponentFixture<StandingInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StandingInstructionComponent]
    });
    fixture = TestBed.createComponent(StandingInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
