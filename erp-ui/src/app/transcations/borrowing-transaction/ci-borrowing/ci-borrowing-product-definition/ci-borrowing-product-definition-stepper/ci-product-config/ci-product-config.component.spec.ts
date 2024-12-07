import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiProductConfigComponent } from './ci-product-config.component';

describe('CiProductConfigComponent', () => {
  let component: CiProductConfigComponent;
  let fixture: ComponentFixture<CiProductConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiProductConfigComponent]
    });
    fixture = TestBed.createComponent(CiProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
