import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenalityConfigComponent } from './penality-config.component';

describe('PenalityConfigComponent', () => {
  let component: PenalityConfigComponent;
  let fixture: ComponentFixture<PenalityConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenalityConfigComponent]
    });
    fixture = TestBed.createComponent(PenalityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
