import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiProductConfigComponent } from './si-product-config.component';

describe('SiProductConfigComponent', () => {
  let component: SiProductConfigComponent;
  let fixture: ComponentFixture<SiProductConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiProductConfigComponent]
    });
    fixture = TestBed.createComponent(SiProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
