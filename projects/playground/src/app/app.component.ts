import { Component } from '@angular/core';
import { NgDatetimePicker } from 'ng-datetime-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgDatetimePicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedDate: string | null = new Date().toISOString();

  onDateTimeChange(date: string | null) {
    this.selectedDate = date;
  }
}
