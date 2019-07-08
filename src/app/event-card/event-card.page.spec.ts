import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardPage } from './event-card.page';

describe('EventCardPage', () => {
  let component: EventCardPage;
  let fixture: ComponentFixture<EventCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
