import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsurerDetailsComponent } from './add-insurer-details.component';

describe('AddInsurerDetailsComponent', () => {
  let component: AddInsurerDetailsComponent;
  let fixture: ComponentFixture<AddInsurerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInsurerDetailsComponent]
    });
    fixture = TestBed.createComponent(AddInsurerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
