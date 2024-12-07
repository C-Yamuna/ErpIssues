import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLinkedShareCapitalComponent } from './sao-linked-share-capital.component';

describe('SaoLinkedShareCapitalComponent', () => {
  let component: SaoLinkedShareCapitalComponent;
  let fixture: ComponentFixture<SaoLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(SaoLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
