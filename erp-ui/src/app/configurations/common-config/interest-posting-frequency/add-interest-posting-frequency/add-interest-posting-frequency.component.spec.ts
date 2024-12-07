import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterestPostingFrequencyComponent } from './add-interest-posting-frequency.component';

describe('AddInterestPostingFrequencyComponent', () => {
  let component: AddInterestPostingFrequencyComponent;
  let fixture: ComponentFixture<AddInterestPostingFrequencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInterestPostingFrequencyComponent]
    });
    fixture = TestBed.createComponent(AddInterestPostingFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
