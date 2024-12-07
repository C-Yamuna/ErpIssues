import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanCollectionsComponent } from './sao-loan-collections.component';

describe('SaoLoanCollectionsComponent', () => {
  let component: SaoLoanCollectionsComponent;
  let fixture: ComponentFixture<SaoLoanCollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanCollectionsComponent]
    });
    fixture = TestBed.createComponent(SaoLoanCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
