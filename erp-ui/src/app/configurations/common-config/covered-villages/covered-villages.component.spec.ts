import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredVillagesComponent } from './covered-villages.component';

describe('CoveredVillagesComponent', () => {
  let component: CoveredVillagesComponent;
  let fixture: ComponentFixture<CoveredVillagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoveredVillagesComponent]
    });
    fixture = TestBed.createComponent(CoveredVillagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
