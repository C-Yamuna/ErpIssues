import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdWorkFlowComponent } from './td-work-flow.component';

describe('TdWorkFlowComponent', () => {
  let component: TdWorkFlowComponent;
  let fixture: ComponentFixture<TdWorkFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdWorkFlowComponent]
    });
    fixture = TestBed.createComponent(TdWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
