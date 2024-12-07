import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiViewBorrowingComponent } from './si-view-borrowing.component';

describe('SiViewBorrowingComponent', () => {
  let component: SiViewBorrowingComponent;
  let fixture: ComponentFixture<SiViewBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiViewBorrowingComponent]
    });
    fixture = TestBed.createComponent(SiViewBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
