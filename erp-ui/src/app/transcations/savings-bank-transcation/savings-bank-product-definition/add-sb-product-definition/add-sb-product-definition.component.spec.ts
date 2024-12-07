import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSbProductDefinitionComponent } from './add-sb-product-definition.component';

describe('AddSbProductDefinitionComponent', () => {
  let component: AddSbProductDefinitionComponent;
  let fixture: ComponentFixture<AddSbProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSbProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddSbProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
