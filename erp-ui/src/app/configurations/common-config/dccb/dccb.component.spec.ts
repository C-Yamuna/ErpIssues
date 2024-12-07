import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DccbComponent } from './dccb.component';

describe('DccbComponent', () => {
  let component: DccbComponent;
  let fixture: ComponentFixture<DccbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DccbComponent]
    });
    fixture = TestBed.createComponent(DccbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
