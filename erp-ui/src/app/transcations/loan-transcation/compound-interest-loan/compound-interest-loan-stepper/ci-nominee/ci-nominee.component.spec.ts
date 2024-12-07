import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiNomineeComponent } from './ci-nominee.component';

describe('CiNomineeComponent', () => {
  let component: CiNomineeComponent;
  let fixture: ComponentFixture<CiNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiNomineeComponent]
    });
    fixture = TestBed.createComponent(CiNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
