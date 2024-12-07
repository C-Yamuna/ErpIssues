import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaultCreationComponent } from './view-vault-creation.component';

describe('ViewVaultCreationComponent', () => {
  let component: ViewVaultCreationComponent;
  let fixture: ComponentFixture<ViewVaultCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVaultCreationComponent]
    });
    fixture = TestBed.createComponent(ViewVaultCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
