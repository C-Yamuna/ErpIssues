import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiProductConfigurationComponent } from './ci-product-configuration.component';

describe('CiProductConfigurationComponent', () => {
  let component: CiProductConfigurationComponent;
  let fixture: ComponentFixture<CiProductConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiProductConfigurationComponent]
    });
    fixture = TestBed.createComponent(CiProductConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
