import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiChargesComponent } from './si-charges.component';

describe('SiChargesComponent', () => {
  let component: SiChargesComponent;
  let fixture: ComponentFixture<SiChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiChargesComponent]
    });
    fixture = TestBed.createComponent(SiChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
