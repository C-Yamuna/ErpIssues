import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountBlockComponent } from './amount-block.component';

describe('AmountBlockComponent', () => {
  let component: AmountBlockComponent;
  let fixture: ComponentFixture<AmountBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmountBlockComponent]
    });
    fixture = TestBed.createComponent(AmountBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
