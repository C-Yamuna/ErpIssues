import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPostingFrequencyComponent } from './interest-posting-frequency.component';

describe('InterestPostingFrequencyComponent', () => {
  let component: InterestPostingFrequencyComponent;
  let fixture: ComponentFixture<InterestPostingFrequencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestPostingFrequencyComponent]
    });
    fixture = TestBed.createComponent(InterestPostingFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
