import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BClassBasicDetailsComponent } from './bclass-basic-details.component';

describe('BClassBasicDetailsComponent', () => {
  let component: BClassBasicDetailsComponent;
  let fixture: ComponentFixture<BClassBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BClassBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(BClassBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
