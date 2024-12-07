import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionkycComponent } from './institutionkyc.component';

describe('InstitutionkycComponent', () => {
  let component: InstitutionkycComponent;
  let fixture: ComponentFixture<InstitutionkycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionkycComponent]
    });
    fixture = TestBed.createComponent(InstitutionkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
