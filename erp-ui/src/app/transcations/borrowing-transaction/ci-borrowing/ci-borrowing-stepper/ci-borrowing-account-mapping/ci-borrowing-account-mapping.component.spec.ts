import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingAccountMappingComponent } from './ci-borrowing-account-mapping.component';

describe('CiBorrowingAccountMappingComponent', () => {
  let component: CiBorrowingAccountMappingComponent;
  let fixture: ComponentFixture<CiBorrowingAccountMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingAccountMappingComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
