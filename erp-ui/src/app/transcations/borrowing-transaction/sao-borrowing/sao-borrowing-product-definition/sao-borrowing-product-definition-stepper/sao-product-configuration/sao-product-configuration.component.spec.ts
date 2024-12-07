import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductConfigurationComponent } from './sao-product-configuration.component';

describe('SaoProductConfigurationComponent', () => {
  let component: SaoProductConfigurationComponent;
  let fixture: ComponentFixture<SaoProductConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductConfigurationComponent]
    });
    fixture = TestBed.createComponent(SaoProductConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
