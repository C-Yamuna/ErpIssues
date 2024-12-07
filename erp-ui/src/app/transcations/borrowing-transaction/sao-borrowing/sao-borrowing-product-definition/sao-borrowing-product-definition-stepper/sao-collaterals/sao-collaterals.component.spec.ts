import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoCollateralsComponent } from './sao-collaterals.component';

describe('SaoCollateralsComponent', () => {
  let component: SaoCollateralsComponent;
  let fixture: ComponentFixture<SaoCollateralsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoCollateralsComponent]
    });
    fixture = TestBed.createComponent(SaoCollateralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
