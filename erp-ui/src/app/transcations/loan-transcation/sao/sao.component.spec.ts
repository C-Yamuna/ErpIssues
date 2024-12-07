import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAOComponent } from './sao.component';

describe('SAOComponent', () => {
  let component: SAOComponent;
  let fixture: ComponentFixture<SAOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAOComponent]
    });
    fixture = TestBed.createComponent(SAOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
