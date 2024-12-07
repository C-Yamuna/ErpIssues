import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequebookIssueComponent } from './chequebook-issue.component';

describe('ChequebookIssueComponent', () => {
  let component: ChequebookIssueComponent;
  let fixture: ComponentFixture<ChequebookIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChequebookIssueComponent]
    });
    fixture = TestBed.createComponent(ChequebookIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
