import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLinkedShareCapitalComponent } from './si-linked-share-capital.component';

describe('SiLinkedShareCapitalComponent', () => {
  let component: SiLinkedShareCapitalComponent;
  let fixture: ComponentFixture<SiLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(SiLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
