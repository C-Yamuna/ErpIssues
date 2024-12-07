import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionBasicDetailsComponent } from './institution-basic-details.component';

describe('InstitutionBasicDetailsComponent', () => {
  let component: InstitutionBasicDetailsComponent;
  let fixture: ComponentFixture<InstitutionBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(InstitutionBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
