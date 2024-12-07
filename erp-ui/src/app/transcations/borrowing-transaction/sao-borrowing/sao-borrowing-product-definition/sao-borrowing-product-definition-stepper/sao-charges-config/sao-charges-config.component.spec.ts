import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoChargesConfigComponent } from './sao-charges-config.component';

describe('SaoChargesConfigComponent', () => {
  let component: SaoChargesConfigComponent;
  let fixture: ComponentFixture<SaoChargesConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoChargesConfigComponent]
    });
    fixture = TestBed.createComponent(SaoChargesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
