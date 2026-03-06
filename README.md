# ng-datetime-picker

An Angular library providing a date and time picker component built with Angular Material.

## Features

- Date selection via Angular Material datepicker
- Hour, minute, and second input fields with validation (0-23 hours, 0-59 minutes, 0-59 seconds)
- Two-way binding support via `value` input and `valueChange` output
- Values exchanged as ISO 8601 strings
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
  myDate: string | null = new Date().toISOString();

  onDateChange(date: string | null) {
    this.myDate = date;
  }
}
```

### API

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string \| null` | The current datetime value as an ISO 8601 string |
| `valueChange` | `EventEmitter<string \| null>` | Emitted when the user changes the date or time |

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

### Running e2e tests

```bash
npm run e2e
```

E2E tests use [Playwright](https://playwright.dev/). The script builds the library and runs Playwright against the playground app.

### Playground

```bash
npm start
```

Serves the playground app at `http://localhost:4200` for manual testing.

### Project structure

```
projects/ng-datetime-picker/
  src/
    lib/
      ng-datetime-picker.component.ts     # Component implementation
      ng-datetime-picker.component.html    # Component template
      ng-datetime-picker.component.spec.ts # Unit tests
    public-api.ts                          # Public API exports
  package.json                             # Library package metadata
projects/playground/                       # Demo/playground app
e2e/                                       # Playwright e2e tests
playwright.config.ts                       # Playwright configuration
```
