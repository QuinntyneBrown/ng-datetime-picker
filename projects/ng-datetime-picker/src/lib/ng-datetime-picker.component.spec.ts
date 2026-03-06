import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgDatetimePicker } from './ng-datetime-picker.component';

describe('NgDatetimePicker', () => {
  let component: NgDatetimePicker;
  let fixture: ComponentFixture<NgDatetimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDatetimePicker, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NgDatetimePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have selector qb-datetime-picker', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.qb-datetime-picker')).toBeTruthy();
  });

  it('should initialize with null value and zero time', () => {
    expect(component.value).toBeNull();
    expect(component.date).toBeNull();
    expect(component.hour).toBe(0);
    expect(component.minute).toBe(0);
    expect(component.second).toBe(0);
  });

  describe('ngOnChanges', () => {
    it('should sync date and time from a non-null value input', () => {
      const testDate = new Date(2024, 5, 15, 14, 30, 45);
      component.value = testDate;
      component.ngOnChanges({
        value: {
          currentValue: testDate,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      expect(component.date).toEqual(new Date(2024, 5, 15));
      expect(component.hour).toBe(14);
      expect(component.minute).toBe(30);
      expect(component.second).toBe(45);
    });

    it('should reset date and time when value is set to null', () => {
      component.value = new Date(2024, 5, 15, 14, 30);
      component.ngOnChanges({
        value: {
          currentValue: new Date(2024, 5, 15, 14, 30),
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });

      component.value = null;
      component.ngOnChanges({
        value: {
          currentValue: null,
          previousValue: new Date(2024, 5, 15, 14, 30),
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.date).toBeNull();
      expect(component.hour).toBe(0);
      expect(component.minute).toBe(0);
      expect(component.second).toBe(0);
    });

    it('should not sync when a different input changes', () => {
      component.date = new Date(2024, 0, 1);
      component.hour = 10;
      component.minute = 20;

      component.ngOnChanges({
        someOtherProp: {
          currentValue: 'x',
          previousValue: 'y',
          firstChange: false,
          isFirstChange: () => false,
        },
      });

      expect(component.date).toEqual(new Date(2024, 0, 1));
      expect(component.hour).toBe(10);
      expect(component.minute).toBe(20);
    });
  });

  describe('onDateChange', () => {
    it('should update date and emit combined datetime', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      const newDate = new Date(2024, 3, 10);
      component.hour = 9;
      component.minute = 45;

      component.onDateChange({ value: newDate });

      expect(component.date).toEqual(newDate);
      expect(spy).toHaveBeenCalledWith(new Date(2024, 3, 10, 9, 45, 0));
    });

    it('should emit null when date is cleared', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.onDateChange({ value: null });

      expect(component.date).toBeNull();
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('onHourChange', () => {
    it('should update hour and emit combined datetime', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = new Date(2024, 6, 20);
      component.minute = 15;

      component.onHourChange(18);

      expect(component.hour).toBe(18);
      expect(spy).toHaveBeenCalledWith(new Date(2024, 6, 20, 18, 15, 0));
    });

    it('should clamp hour to max 23', () => {
      component.date = new Date(2024, 0, 1);
      component.onHourChange(30);
      expect(component.hour).toBe(23);
    });

    it('should clamp hour to min 0', () => {
      component.date = new Date(2024, 0, 1);
      component.onHourChange(-5);
      expect(component.hour).toBe(0);
    });

    it('should emit null when no date is set', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = null;
      component.onHourChange(10);
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('onMinuteChange', () => {
    it('should update minute and emit combined datetime', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = new Date(2024, 11, 25);
      component.hour = 8;

      component.onMinuteChange(55);

      expect(component.minute).toBe(55);
      expect(spy).toHaveBeenCalledWith(new Date(2024, 11, 25, 8, 55, 0));
    });

    it('should clamp minute to max 59', () => {
      component.date = new Date(2024, 0, 1);
      component.onMinuteChange(75);
      expect(component.minute).toBe(59);
    });

    it('should clamp minute to min 0', () => {
      component.date = new Date(2024, 0, 1);
      component.onMinuteChange(-10);
      expect(component.minute).toBe(0);
    });

    it('should emit null when no date is set', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = null;
      component.onMinuteChange(30);
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('onSecondChange', () => {
    it('should update second and emit combined datetime', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = new Date(2024, 11, 25);
      component.hour = 8;
      component.minute = 30;

      component.onSecondChange(45);

      expect(component.second).toBe(45);
      expect(spy).toHaveBeenCalledWith(new Date(2024, 11, 25, 8, 30, 45));
    });

    it('should clamp second to max 59', () => {
      component.date = new Date(2024, 0, 1);
      component.onSecondChange(75);
      expect(component.second).toBe(59);
    });

    it('should clamp second to min 0', () => {
      component.date = new Date(2024, 0, 1);
      component.onSecondChange(-10);
      expect(component.second).toBe(0);
    });

    it('should emit null when no date is set', () => {
      const spy = jest.spyOn(component.valueChange, 'emit');
      component.date = null;
      component.onSecondChange(30);
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('template rendering', () => {
    it('should render date input with matDatepicker', () => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('mat-datepicker')).toBeTruthy();
      expect(el.querySelector('.mat-mdc-form-field input')).toBeTruthy();
    });

    it('should render hour input', () => {
      const el = fixture.nativeElement as HTMLElement;
      const inputs = el.querySelectorAll('input[type="number"]');
      expect(inputs.length).toBe(3);
    });

    it('should render mat-datepicker-toggle', () => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('mat-datepicker-toggle')).toBeTruthy();
    });
  });
});
