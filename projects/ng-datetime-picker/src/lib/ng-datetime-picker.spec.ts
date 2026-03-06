import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDatetimePicker } from './ng-datetime-picker';

describe('NgDatetimePicker', () => {
  let component: NgDatetimePicker;
  let fixture: ComponentFixture<NgDatetimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDatetimePicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgDatetimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
