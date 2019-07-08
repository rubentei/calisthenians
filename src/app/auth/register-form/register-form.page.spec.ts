import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormPage } from './register-form.page';

describe('RegisterFormPage', () => {
  let component: RegisterFormPage;
  let fixture: ComponentFixture<RegisterFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
