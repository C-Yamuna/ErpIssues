import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingAccountMappingComponent } from './term-borrowing-account-mapping.component';

describe('TermBorrowingAccountMappingComponent', () => {
  let component: TermBorrowingAccountMappingComponent;
  let fixture: ComponentFixture<TermBorrowingAccountMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingAccountMappingComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
