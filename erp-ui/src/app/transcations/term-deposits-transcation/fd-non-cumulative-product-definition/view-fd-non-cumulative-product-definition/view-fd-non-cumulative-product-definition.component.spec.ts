import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFdNonCumulativeProductDefinitionComponent } from './view-fd-non-cumulative-product-definition.component';

describe('ViewFdNonCumulativeProductDefinitionComponent', () => {
  let component: ViewFdNonCumulativeProductDefinitionComponent;
  let fixture: ComponentFixture<ViewFdNonCumulativeProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFdNonCumulativeProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewFdNonCumulativeProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
