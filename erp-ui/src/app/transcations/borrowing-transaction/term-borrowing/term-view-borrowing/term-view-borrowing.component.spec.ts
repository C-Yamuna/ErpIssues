import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermViewBorrowingComponent } from './term-view-borrowing.component';

describe('TermViewBorrowingComponent', () => {
  let component: TermViewBorrowingComponent;
  let fixture: ComponentFixture<TermViewBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermViewBorrowingComponent]
    });
    fixture = TestBed.createComponent(TermViewBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
