import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesCollectionComponent } from './charges-collection.component';

describe('ChargesCollectionComponent', () => {
  let component: ChargesCollectionComponent;
  let fixture: ComponentFixture<ChargesCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargesCollectionComponent]
    });
    fixture = TestBed.createComponent(ChargesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
