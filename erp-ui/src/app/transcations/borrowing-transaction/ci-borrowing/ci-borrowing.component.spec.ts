import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingComponent } from './ci-borrowing.component';

describe('CiBorrowingComponent', () => {
  let component: CiBorrowingComponent;
  let fixture: ComponentFixture<CiBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
