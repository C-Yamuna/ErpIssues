import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BclassNomineeComponent } from './bclass-nominee.component';

describe('BclassNomineeComponent', () => {
  let component: BclassNomineeComponent;
  let fixture: ComponentFixture<BclassNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BclassNomineeComponent]
    });
    fixture = TestBed.createComponent(BclassNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
