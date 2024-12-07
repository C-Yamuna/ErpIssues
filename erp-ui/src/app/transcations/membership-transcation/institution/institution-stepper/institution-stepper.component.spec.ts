import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionStepperComponent } from './institution-stepper.component';

describe('InstitutionStepperComponent', () => {
  let component: InstitutionStepperComponent;
  let fixture: ComponentFixture<InstitutionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionStepperComponent]
    });
    fixture = TestBed.createComponent(InstitutionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
