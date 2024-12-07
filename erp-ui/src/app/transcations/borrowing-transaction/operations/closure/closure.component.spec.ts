import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureComponent } from './closure.component';

describe('ClosureComponent', () => {
  let component: ClosureComponent;
  let fixture: ComponentFixture<ClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosureComponent]
    });
    fixture = TestBed.createComponent(ClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
