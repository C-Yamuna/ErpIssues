import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProdPurposeConfigComponent } from './sao-prod-purpose-config.component';

describe('SaoProdPurposeConfigComponent', () => {
  let component: SaoProdPurposeConfigComponent;
  let fixture: ComponentFixture<SaoProdPurposeConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProdPurposeConfigComponent]
    });
    fixture = TestBed.createComponent(SaoProdPurposeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
