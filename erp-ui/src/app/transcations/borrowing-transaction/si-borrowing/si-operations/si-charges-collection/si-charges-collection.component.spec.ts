import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiChargesCollectionComponent } from './si-charges-collection.component';

describe('SiChargesCollectionComponent', () => {
  let component: SiChargesCollectionComponent;
  let fixture: ComponentFixture<SiChargesCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiChargesCollectionComponent]
    });
    fixture = TestBed.createComponent(SiChargesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
