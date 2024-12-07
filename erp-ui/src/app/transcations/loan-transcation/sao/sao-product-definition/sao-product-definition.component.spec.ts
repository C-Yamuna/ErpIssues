import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductDefinitionComponent } from './sao-product-definition.component';

describe('SaoProductDefinitionComponent', () => {
  let component: SaoProductDefinitionComponent;
  let fixture: ComponentFixture<SaoProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(SaoProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
