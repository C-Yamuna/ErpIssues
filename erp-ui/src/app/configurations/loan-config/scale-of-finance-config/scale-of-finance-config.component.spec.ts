import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleOfFinanceConfigComponent } from './scale-of-finance-config.component';

describe('ScaleOfFinanceConfigComponent', () => {
  let component: ScaleOfFinanceConfigComponent;
  let fixture: ComponentFixture<ScaleOfFinanceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleOfFinanceConfigComponent]
    });
    fixture = TestBed.createComponent(ScaleOfFinanceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
