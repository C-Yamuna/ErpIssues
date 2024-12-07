import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypesComponent } from './service-types.component';

describe('ServiceTypesComponent', () => {
  let component: ServiceTypesComponent;
  let fixture: ComponentFixture<ServiceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceTypesComponent]
    });
    fixture = TestBed.createComponent(ServiceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
