import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeProductComponent } from './fd-cumulative-product.component';

describe('FdCumulativeProductComponent', () => {
  let component: FdCumulativeProductComponent;
  let fixture: ComponentFixture<FdCumulativeProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeProductComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
