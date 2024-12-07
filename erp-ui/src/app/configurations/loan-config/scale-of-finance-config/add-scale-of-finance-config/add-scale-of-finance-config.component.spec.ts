import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScaleOfFinanceConfigComponent } from './add-scale-of-finance-config.component';

describe('AddScaleOfFinanceConfigComponent', () => {
  let component: AddScaleOfFinanceConfigComponent;
  let fixture: ComponentFixture<AddScaleOfFinanceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScaleOfFinanceConfigComponent]
    });
    fixture = TestBed.createComponent(AddScaleOfFinanceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
