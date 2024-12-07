import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipTypeComponent } from './relationship-type.component';

describe('RelationshipTypeComponent', () => {
  let component: RelationshipTypeComponent;
  let fixture: ComponentFixture<RelationshipTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationshipTypeComponent]
    });
    fixture = TestBed.createComponent(RelationshipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
