import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoterConfigComponent } from './add-voter-config.component';

describe('AddVoterConfigComponent', () => {
  let component: AddVoterConfigComponent;
  let fixture: ComponentFixture<AddVoterConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVoterConfigComponent]
    });
    fixture = TestBed.createComponent(AddVoterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
