import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocietyBranchComponent } from './add-society-branch.component';

describe('AddSocietyBranchComponent', () => {
  let component: AddSocietyBranchComponent;
  let fixture: ComponentFixture<AddSocietyBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSocietyBranchComponent]
    });
    fixture = TestBed.createComponent(AddSocietyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
