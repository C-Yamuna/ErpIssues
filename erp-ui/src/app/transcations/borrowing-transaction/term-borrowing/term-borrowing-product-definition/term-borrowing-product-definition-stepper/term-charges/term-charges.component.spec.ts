import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermChargesComponent } from './term-charges.component';

describe('TermChargesComponent', () => {
  let component: TermChargesComponent;
  let fixture: ComponentFixture<TermChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermChargesComponent]
    });
    fixture = TestBed.createComponent(TermChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
