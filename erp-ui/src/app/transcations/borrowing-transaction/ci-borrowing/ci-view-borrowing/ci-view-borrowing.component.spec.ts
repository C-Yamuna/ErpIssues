import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiViewBorrowingComponent } from './ci-view-borrowing.component';

describe('CiViewBorrowingComponent', () => {
  let component: CiViewBorrowingComponent;
  let fixture: ComponentFixture<CiViewBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiViewBorrowingComponent]
    });
    fixture = TestBed.createComponent(CiViewBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
