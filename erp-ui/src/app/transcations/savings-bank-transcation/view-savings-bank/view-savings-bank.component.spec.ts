import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavingsBankComponent } from './view-savings-bank.component';

describe('ViewSavingsBankComponent', () => {
  let component: ViewSavingsBankComponent;
  let fixture: ComponentFixture<ViewSavingsBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSavingsBankComponent]
    });
    fixture = TestBed.createComponent(ViewSavingsBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
