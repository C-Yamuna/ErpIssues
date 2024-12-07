import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductConfigrationComponent } from './sao-product-configration.component';

describe('SaoProductConfigrationComponent', () => {
  let component: SaoProductConfigrationComponent;
  let fixture: ComponentFixture<SaoProductConfigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductConfigrationComponent]
    });
    fixture = TestBed.createComponent(SaoProductConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
