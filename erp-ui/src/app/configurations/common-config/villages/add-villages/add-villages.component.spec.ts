import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVillagesComponent } from './add-villages.component';

describe('AddVillagesComponent', () => {
  let component: AddVillagesComponent;
  let fixture: ComponentFixture<AddVillagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVillagesComponent]
    });
    fixture = TestBed.createComponent(AddVillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
