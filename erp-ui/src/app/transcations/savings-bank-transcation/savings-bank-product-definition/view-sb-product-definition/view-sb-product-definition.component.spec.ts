import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSbProductDefinitionComponent } from './view-sb-product-definition.component';

describe('ViewSbProductDefinitionComponent', () => {
  let component: ViewSbProductDefinitionComponent;
  let fixture: ComponentFixture<ViewSbProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSbProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewSbProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
