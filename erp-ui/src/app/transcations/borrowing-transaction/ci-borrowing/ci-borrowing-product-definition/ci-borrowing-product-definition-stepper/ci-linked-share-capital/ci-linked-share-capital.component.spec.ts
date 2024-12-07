import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiLinkedShareCapitalComponent } from './ci-linked-share-capital.component';

describe('CiLinkedShareCapitalComponent', () => {
  let component: CiLinkedShareCapitalComponent;
  let fixture: ComponentFixture<CiLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(CiLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
