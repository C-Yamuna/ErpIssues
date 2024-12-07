import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorTypeComponent } from './operator-type.component';

describe('OperatorTypeComponent', () => {
  let component: OperatorTypeComponent;
  let fixture: ComponentFixture<OperatorTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorTypeComponent]
    });
    fixture = TestBed.createComponent(OperatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
