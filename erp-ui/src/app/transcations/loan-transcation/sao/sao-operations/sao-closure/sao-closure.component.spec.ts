import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoClosureComponent } from './sao-closure.component';

describe('SaoClosureComponent', () => {
  let component: SaoClosureComponent;
  let fixture: ComponentFixture<SaoClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoClosureComponent]
    });
    fixture = TestBed.createComponent(SaoClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
