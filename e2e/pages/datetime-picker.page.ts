import { type Locator, type Page } from '@playwright/test';

export class DatetimePickerPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly dateInput: Locator;
  readonly datepickerToggle: Locator;
  readonly hourInput: Locator;
  readonly minuteInput: Locator;
  readonly secondInput: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.dateInput = page.locator('qb-datetime-picker input[matinput]').first();
    this.datepickerToggle = page.locator('mat-datepicker-toggle button');
    this.hourInput = page.locator('input[type="number"]').nth(0);
    this.minuteInput = page.locator('input[type="number"]').nth(1);
    this.secondInput = page.locator('input[type="number"]').nth(2);
    this.output = page.locator('.output strong');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForSelector('qb-datetime-picker');
  }

  async setHour(value: number) {
    await this.hourInput.fill(String(value));
    await this.hourInput.press('Tab');
  }

  async setMinute(value: number) {
    await this.minuteInput.fill(String(value));
    await this.minuteInput.press('Tab');
  }

  async setSecond(value: number) {
    await this.secondInput.fill(String(value));
    await this.secondInput.press('Tab');
  }

  async clearDateInput() {
    await this.dateInput.click();
    await this.page.keyboard.press('Control+a');
    await this.page.keyboard.press('Backspace');
    await this.dateInput.press('Tab');
  }

  async getOutputText(): Promise<string> {
    return (await this.output.textContent()) ?? '';
  }

  async getFormFieldCount(): Promise<number> {
    return await this.page.locator('mat-form-field').count();
  }

  async allFormFieldsHaveOutlineAppearance(): Promise<boolean> {
    const fields = this.page.locator('mat-form-field');
    const count = await fields.count();
    for (let i = 0; i < count; i++) {
      const hasOutline = await fields.nth(i).evaluate((el) =>
        el.classList.contains('mat-form-field-appearance-outline')
      );
      if (!hasOutline) return false;
    }
    return true;
  }
}
