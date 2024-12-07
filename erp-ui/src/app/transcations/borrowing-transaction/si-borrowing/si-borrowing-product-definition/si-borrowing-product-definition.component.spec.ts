import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingProductDefinitionComponent } from './si-borrowing-product-definition.component';

describe('SiBorrowingProductDefinitionComponent', () => {
  let component: SiBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<SiBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
