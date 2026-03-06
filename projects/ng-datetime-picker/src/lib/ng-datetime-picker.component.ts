import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'qb-datetime-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  templateUrl: './ng-datetime-picker.component.html',
  styleUrl: './ng-datetime-picker.component.css',
})
export class NgDatetimePicker implements OnChanges {
  @Input() value: Date | null = null;
  @Output() valueChange = new EventEmitter<Date | null>();

  date: Date | null = null;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.syncFromValue(this.value);
    }
  }

  onDateChange(event: { value: Date | null }): void {
    this.date = event.value;
    this.emitCombined();
  }

  onHourChange(val: number): void {
    this.hour = this.clamp(val, 0, 23);
    this.emitCombined();
  }

  onMinuteChange(val: number): void {
    this.minute = this.clamp(val, 0, 59);
    this.emitCombined();
  }

  onSecondChange(val: number): void {
    this.second = this.clamp(val, 0, 59);
    this.emitCombined();
  }

  private syncFromValue(val: Date | null): void {
    if (val) {
      this.date = new Date(val.getFullYear(), val.getMonth(), val.getDate());
      this.hour = val.getHours();
      this.minute = val.getMinutes();
      this.second = val.getSeconds();
    } else {
      this.date = null;
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
    }
  }

  private emitCombined(): void {
    if (this.date) {
      const combined = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        this.hour,
        this.minute,
        this.second,
      );
      this.valueChange.emit(combined);
    } else {
      this.valueChange.emit(null);
    }
  }

  private clamp(val: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, val));
  }
}
