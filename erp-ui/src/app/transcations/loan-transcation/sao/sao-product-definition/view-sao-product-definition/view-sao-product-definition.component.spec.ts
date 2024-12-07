import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaoProductDefinitionComponent } from './view-sao-product-definition.component';

describe('ViewSaoProductDefinitionComponent', () => {
  let component: ViewSaoProductDefinitionComponent;
  let fixture: ComponentFixture<ViewSaoProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSaoProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewSaoProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
