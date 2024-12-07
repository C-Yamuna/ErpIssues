import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductChargesConfigComponent } from './sao-product-charges-config.component';

describe('SaoProductChargesConfigComponent', () => {
  let component: SaoProductChargesConfigComponent;
  let fixture: ComponentFixture<SaoProductChargesConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductChargesConfigComponent]
    });
    fixture = TestBed.createComponent(SaoProductChargesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
