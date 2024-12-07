import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAccountDetailsComponent } from './term-account-details.component';

describe('TermAccountDetailsComponent', () => {
  let component: TermAccountDetailsComponent;
  let fixture: ComponentFixture<TermAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(TermAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
