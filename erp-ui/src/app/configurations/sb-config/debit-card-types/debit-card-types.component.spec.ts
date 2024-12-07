import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardTypesComponent } from './debit-card-types.component';

describe('DebitCardTypesComponent', () => {
  let component: DebitCardTypesComponent;
  let fixture: ComponentFixture<DebitCardTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitCardTypesComponent]
    });
    fixture = TestBed.createComponent(DebitCardTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
