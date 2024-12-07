import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoNomineeComponent } from './sao-nominee.component';

describe('SaoNomineeComponent', () => {
  let component: SaoNomineeComponent;
  let fixture: ComponentFixture<SaoNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoNomineeComponent]
    });
    fixture = TestBed.createComponent(SaoNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
