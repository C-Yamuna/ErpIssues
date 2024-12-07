import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermProductConfigComponent } from './term-product-config.component';

describe('TermProductConfigComponent', () => {
  let component: TermProductConfigComponent;
  let fixture: ComponentFixture<TermProductConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermProductConfigComponent]
    });
    fixture = TestBed.createComponent(TermProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
