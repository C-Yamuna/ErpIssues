import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApportionTypesComponent } from './apportion-types.component';

describe('ApportionTypesComponent', () => {
  let component: ApportionTypesComponent;
  let fixture: ComponentFixture<ApportionTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApportionTypesComponent]
    });
    fixture = TestBed.createComponent(ApportionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
