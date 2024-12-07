import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiProductDetailsComponent } from './ci-product-details.component';

describe('CiProductDetailsComponent', () => {
  let component: CiProductDetailsComponent;
  let fixture: ComponentFixture<CiProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiProductDetailsComponent]
    });
    fixture = TestBed.createComponent(CiProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
