import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsDetailsComponent } from './pacs-details.component';

describe('PacsDetailsComponent', () => {
  let component: PacsDetailsComponent;
  let fixture: ComponentFixture<PacsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacsDetailsComponent]
    });
    fixture = TestBed.createComponent(PacsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
