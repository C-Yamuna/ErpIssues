import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositsTranscationComponent } from './term-deposits-transcation.component';

describe('TermDepositsTranscationComponent', () => {
  let component: TermDepositsTranscationComponent;
  let fixture: ComponentFixture<TermDepositsTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermDepositsTranscationComponent]
    });
    fixture = TestBed.createComponent(TermDepositsTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
