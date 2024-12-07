import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurerDetailsComponent } from './insurer-details.component';

describe('InsurerDetailsComponent', () => {
  let component: InsurerDetailsComponent;
  let fixture: ComponentFixture<InsurerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsurerDetailsComponent]
    });
    fixture = TestBed.createComponent(InsurerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
