import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiCollectionComponent } from './si-collection.component';

describe('SiCollectionComponent', () => {
  let component: SiCollectionComponent;
  let fixture: ComponentFixture<SiCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiCollectionComponent]
    });
    fixture = TestBed.createComponent(SiCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
