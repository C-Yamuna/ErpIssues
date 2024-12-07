import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingComponent } from './si-borrowing.component';

describe('SiBorrowingComponent', () => {
  let component: SiBorrowingComponent;
  let fixture: ComponentFixture<SiBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
