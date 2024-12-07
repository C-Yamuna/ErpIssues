import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoViewBorrowingComponent } from './sao-view-borrowing.component';

describe('SaoViewBorrowingComponent', () => {
  let component: SaoViewBorrowingComponent;
  let fixture: ComponentFixture<SaoViewBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoViewBorrowingComponent]
    });
    fixture = TestBed.createComponent(SaoViewBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
