import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdAddWorkFlowComponent } from './td-add-work-flow.component';

describe('TdAddWorkFlowComponent', () => {
  let component: TdAddWorkFlowComponent;
  let fixture: ComponentFixture<TdAddWorkFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdAddWorkFlowComponent]
    });
    fixture = TestBed.createComponent(TdAddWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
