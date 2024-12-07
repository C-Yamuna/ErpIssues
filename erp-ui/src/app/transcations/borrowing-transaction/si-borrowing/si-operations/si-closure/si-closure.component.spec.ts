import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiClosureComponent } from './si-closure.component';

describe('SiClosureComponent', () => {
  let component: SiClosureComponent;
  let fixture: ComponentFixture<SiClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiClosureComponent]
    });
    fixture = TestBed.createComponent(SiClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
