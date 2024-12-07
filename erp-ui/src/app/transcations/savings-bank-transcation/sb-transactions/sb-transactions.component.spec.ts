import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbTransactionsComponent } from './sb-transactions.component';

describe('SbTransactionsComponent', () => {
  let component: SbTransactionsComponent;
  let fixture: ComponentFixture<SbTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbTransactionsComponent]
    });
    fixture = TestBed.createComponent(SbTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
