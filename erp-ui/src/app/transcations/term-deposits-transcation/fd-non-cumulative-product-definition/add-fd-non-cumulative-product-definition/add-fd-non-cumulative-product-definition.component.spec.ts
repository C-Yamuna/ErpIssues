import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFdNonCumulativeProductDefinitionComponent } from './add-fd-non-cumulative-product-definition.component';

describe('AddFdNonCumulativeProductDefinitionComponent', () => {
  let component: AddFdNonCumulativeProductDefinitionComponent;
  let fixture: ComponentFixture<AddFdNonCumulativeProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFdNonCumulativeProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddFdNonCumulativeProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
