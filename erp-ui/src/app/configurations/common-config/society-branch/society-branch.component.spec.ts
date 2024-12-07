import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyBranchComponent } from './society-branch.component';

describe('SocietyBranchComponent', () => {
  let component: SocietyBranchComponent;
  let fixture: ComponentFixture<SocietyBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocietyBranchComponent]
    });
    fixture = TestBed.createComponent(SocietyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
