import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoPurposeConfigComponent } from './sao-purpose-config.component';

describe('SaoPurposeConfigComponent', () => {
  let component: SaoPurposeConfigComponent;
  let fixture: ComponentFixture<SaoPurposeConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoPurposeConfigComponent]
    });
    fixture = TestBed.createComponent(SaoPurposeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
