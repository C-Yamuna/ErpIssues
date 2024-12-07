import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacsDetailsComponent } from './add-pacs-details.component';

describe('AddPacsDetailsComponent', () => {
  let component: AddPacsDetailsComponent;
  let fixture: ComponentFixture<AddPacsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPacsDetailsComponent]
    });
    fixture = TestBed.createComponent(AddPacsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
