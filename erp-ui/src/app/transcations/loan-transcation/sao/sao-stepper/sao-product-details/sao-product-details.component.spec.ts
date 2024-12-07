import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductDetailsComponent } from './sao-product-details.component';

describe('SaoProductDetailsComponent', () => {
  let component: SaoProductDetailsComponent;
  let fixture: ComponentFixture<SaoProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductDetailsComponent]
    });
    fixture = TestBed.createComponent(SaoProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
