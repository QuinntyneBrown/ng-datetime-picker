# ng-datetime-picker

An Angular library providing a date and time picker component built with Angular Material.

## Features

- Date selection via Angular Material datepicker
- Hour and minute input fields with validation (0-23 hours, 0-59 minutes)
- Two-way binding support via `value` input and `valueChange` output
- Standalone component — no module import required

## Requirements

- Angular ~17.2
- Angular Material ~17.2
- Angular CDK ~17.2

## Installation

Install the library and its peer dependencies:

```bash
npm install ng-datetime-picker @angular/material @angular/cdk @angular/animations
```

## Usage

```typescript
import { NgDatetimePicker } from 'ng-datetime-picker';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [NgDatetimePicker],
  template: `
    <qb-datetime-picker [value]="myDate" (valueChange)="onDateChange($event)"></qb-datetime-picker>
  `,
})
export class ExampleComponent {
  myDate: Date | null = new Date();

  onDateChange(date: Date | null) {
    this.myDate = date;
  }
}
```

### API

| Property | Type | Description |
|----------|------|-------------|
| `value` | `Date \| null` | The current datetime value |
| `valueChange` | `EventEmitter<Date \| null>` | Emitted when the user changes the date or time |

## Development

### Building

```bash
ng build ng-datetime-picker
```

Build artifacts are output to `dist/ng-datetime-picker`.

### Running unit tests

```bash
npm test
```

Tests use [Jest](https://jestjs.io/) with [jest-preset-angular](https://thymikee.github.io/jest-preset-angular/). Coverage is collected automatically.

### Project structure

```
projects/ng-datetime-picker/
  src/
    lib/
      ng-datetime-picker.ts        # Component implementation
      ng-datetime-picker.spec.ts   # Unit tests
    public-api.ts                   # Public API exports
  package.json                      # Library package metadata
```
