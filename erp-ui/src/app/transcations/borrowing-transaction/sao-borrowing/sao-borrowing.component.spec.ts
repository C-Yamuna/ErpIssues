import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingComponent } from './sao-borrowing.component';

describe('SaoBorrowingComponent', () => {
  let component: SaoBorrowingComponent;
  let fixture: ComponentFixture<SaoBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
