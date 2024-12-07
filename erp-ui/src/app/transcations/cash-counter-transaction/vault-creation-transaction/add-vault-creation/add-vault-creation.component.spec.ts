import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaultCreationComponent } from './add-vault-creation.component';

describe('AddVaultCreationComponent', () => {
  let component: AddVaultCreationComponent;
  let fixture: ComponentFixture<AddVaultCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVaultCreationComponent]
    });
    fixture = TestBed.createComponent(AddVaultCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
