import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingAccountMappingComponent } from './sao-borrowing-account-mapping.component';

describe('SaoBorrowingAccountMappingComponent', () => {
  let component: SaoBorrowingAccountMappingComponent;
  let fixture: ComponentFixture<SaoBorrowingAccountMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingAccountMappingComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingAccountMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
