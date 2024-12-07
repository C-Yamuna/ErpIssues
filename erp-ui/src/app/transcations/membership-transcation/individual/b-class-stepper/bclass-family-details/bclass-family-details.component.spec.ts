import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BclassFamilyDetailsComponent } from './bclass-family-details.component';

describe('BclassFamilyDetailsComponent', () => {
  let component: BclassFamilyDetailsComponent;
  let fixture: ComponentFixture<BclassFamilyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BclassFamilyDetailsComponent]
    });
    fixture = TestBed.createComponent(BclassFamilyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
