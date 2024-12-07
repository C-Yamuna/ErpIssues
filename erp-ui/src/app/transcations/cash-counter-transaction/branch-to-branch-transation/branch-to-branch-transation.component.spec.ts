import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchToBranchTransationComponent } from './branch-to-branch-transation.component';

describe('BranchToBranchTransationComponent', () => {
  let component: BranchToBranchTransationComponent;
  let fixture: ComponentFixture<BranchToBranchTransationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchToBranchTransationComponent]
    });
    fixture = TestBed.createComponent(BranchToBranchTransationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
