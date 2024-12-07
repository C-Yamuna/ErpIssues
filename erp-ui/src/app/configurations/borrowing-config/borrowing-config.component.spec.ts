import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingConfigComponent } from './borrowing-config.component';

describe('BorrowingConfigComponent', () => {
  let component: BorrowingConfigComponent;
  let fixture: ComponentFixture<BorrowingConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingConfigComponent]
    });
    fixture = TestBed.createComponent(BorrowingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
