import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDccbBranchComponent } from './add-dccb-branch.component';

describe('AddDccbBranchComponent', () => {
  let component: AddDccbBranchComponent;
  let fixture: ComponentFixture<AddDccbBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDccbBranchComponent]
    });
    fixture = TestBed.createComponent(AddDccbBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
