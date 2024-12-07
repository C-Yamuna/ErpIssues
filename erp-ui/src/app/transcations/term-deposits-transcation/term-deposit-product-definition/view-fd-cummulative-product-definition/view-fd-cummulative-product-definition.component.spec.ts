import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFdCummulativeProductDefinitionComponent } from './view-fd-cummulative-product-definition.component';

describe('ViewFdCummulativeProductDefinitionComponent', () => {
  let component: ViewFdCummulativeProductDefinitionComponent;
  let fixture: ComponentFixture<ViewFdCummulativeProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFdCummulativeProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewFdCummulativeProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
