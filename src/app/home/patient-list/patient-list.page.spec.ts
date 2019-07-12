import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListPage } from './patient-list.page';

describe('PatientListPage', () => {
  let component: PatientListPage;
  let fixture: ComponentFixture<PatientListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
