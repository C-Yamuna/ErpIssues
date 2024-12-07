import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingAccountMappingComponent } from './si-borrowing-account-mapping.component';

describe('SiBorrowingAccountMappingComponent', () => {
  let component: SiBorrowingAccountMappingComponent;
  let fixture: ComponentFixture<SiBorrowingAccountMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingAccountMappingComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
