import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReasonsComponent } from './add-reasons.component';

describe('AddReasonsComponent', () => {
  let component: AddReasonsComponent;
  let fixture: ComponentFixture<AddReasonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReasonsComponent]
    });
    fixture = TestBed.createComponent(AddReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
