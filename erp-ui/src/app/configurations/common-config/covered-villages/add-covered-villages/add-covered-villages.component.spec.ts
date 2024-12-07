import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoveredVillagesComponent } from './add-covered-villages.component';

describe('AddCoveredVillagesComponent', () => {
  let component: AddCoveredVillagesComponent;
  let fixture: ComponentFixture<AddCoveredVillagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoveredVillagesComponent]
    });
    fixture = TestBed.createComponent(AddCoveredVillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
