import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsClosureComponent } from './investments-closure.component';

describe('InvestmentsClosureComponent', () => {
  let component: InvestmentsClosureComponent;
  let fixture: ComponentFixture<InvestmentsClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsClosureComponent]
    });
    fixture = TestBed.createComponent(InvestmentsClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
