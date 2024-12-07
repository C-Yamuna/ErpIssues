import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiNomineeComponent } from './si-nominee.component';

describe('SiNomineeComponent', () => {
  let component: SiNomineeComponent;
  let fixture: ComponentFixture<SiNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiNomineeComponent]
    });
    fixture = TestBed.createComponent(SiNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
