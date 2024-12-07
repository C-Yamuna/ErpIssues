import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingComponent } from './term-borrowing.component';

describe('TermBorrowingComponent', () => {
  let component: TermBorrowingComponent;
  let fixture: ComponentFixture<TermBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
