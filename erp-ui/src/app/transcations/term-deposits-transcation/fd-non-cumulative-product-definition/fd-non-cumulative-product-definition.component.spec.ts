import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition.component';

describe('FdNonCumulativeProductDefinitionComponent', () => {
  let component: FdNonCumulativeProductDefinitionComponent;
  let fixture: ComponentFixture<FdNonCumulativeProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
