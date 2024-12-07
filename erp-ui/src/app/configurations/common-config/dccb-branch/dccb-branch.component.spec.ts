import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DccbBranchComponent } from './dccb-branch.component';

describe('DccbBranchComponent', () => {
  let component: DccbBranchComponent;
  let fixture: ComponentFixture<DccbBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DccbBranchComponent]
    });
    fixture = TestBed.createComponent(DccbBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
