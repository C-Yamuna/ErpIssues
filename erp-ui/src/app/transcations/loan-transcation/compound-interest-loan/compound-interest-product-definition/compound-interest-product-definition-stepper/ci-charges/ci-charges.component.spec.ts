import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiChargesComponent } from './ci-charges.component';

describe('CiChargesComponent', () => {
  let component: CiChargesComponent;
  let fixture: ComponentFixture<CiChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiChargesComponent]
    });
    fixture = TestBed.createComponent(CiChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
