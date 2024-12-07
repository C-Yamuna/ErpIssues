import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLinkedShareCapitalComponent } from './term-linked-share-capital.component';

describe('TermLinkedShareCapitalComponent', () => {
  let component: TermLinkedShareCapitalComponent;
  let fixture: ComponentFixture<TermLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(TermLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
