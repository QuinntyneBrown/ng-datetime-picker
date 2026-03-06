import { test, expect } from '@playwright/test';
import { DatetimePickerPage } from './pages/datetime-picker.page';

test.describe('DateTime Picker Playground', () => {
  let pickerPage: DatetimePickerPage;

  test.beforeEach(async ({ page }) => {
    pickerPage = new DatetimePickerPage(page);
    await pickerPage.goto();
  });

  test('should display the page heading', async () => {
    await expect(pickerPage.heading).toHaveText('DateTime Picker Demo');
  });

  test('should render the datetime picker component', async () => {
    await expect(pickerPage.dateInput).toBeVisible();
    await expect(pickerPage.hourInput).toBeVisible();
    await expect(pickerPage.minuteInput).toBeVisible();
    await expect(pickerPage.secondInput).toBeVisible();
  });

  test('should render four form fields with outline appearance', async () => {
    expect(await pickerPage.getFormFieldCount()).toBe(4);
    expect(await pickerPage.allFormFieldsHaveOutlineAppearance()).toBe(true);
  });

  test('should show a selected date on initial load', async () => {
    const text = await pickerPage.getOutputText();
    expect(text).not.toBe('None');
  });

  test('should update output when hour is changed', async () => {
    const before = await pickerPage.getOutputText();
    await pickerPage.setHour(15);
    const after = await pickerPage.getOutputText();
    expect(after).not.toBe(before);
  });

  test('should update output when minute is changed', async () => {
    const before = await pickerPage.getOutputText();
    await pickerPage.setMinute(45);
    const after = await pickerPage.getOutputText();
    expect(after).not.toBe(before);
  });

  test('should update output when second is changed', async () => {
    const before = await pickerPage.getOutputText();
    await pickerPage.setSecond(30);
    const after = await pickerPage.getOutputText();
    expect(after).not.toBe(before);
  });

  test('should open datepicker calendar when toggle is clicked', async ({ page }) => {
    await pickerPage.datepickerToggle.click();
    const calendar = page.locator('mat-calendar');
    await expect(calendar).toBeVisible();
  });

  test('should select a date from the calendar', async ({ page }) => {
    await pickerPage.datepickerToggle.click();
    const calendar = page.locator('mat-calendar');
    await expect(calendar).toBeVisible();

    // Click the first enabled date cell in the calendar
    const dateCell = calendar.locator('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)').first();
    await dateCell.click();

    // Calendar should close after selection
    await expect(calendar).not.toBeVisible();

    // Output should still show a date (not None)
    const text = await pickerPage.getOutputText();
    expect(text).not.toBe('None');
  });

  test('should show None when date is cleared', async () => {
    await pickerPage.clearDateInput();
    const text = await pickerPage.getOutputText();
    expect(text).toBe('None');
  });

  test('should render the datepicker toggle button', async () => {
    await expect(pickerPage.datepickerToggle).toBeVisible();
  });

  test('should display output in UTC ISO 8601 format', async () => {
    const text = await pickerPage.getOutputText();
    expect(text).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test('should output UTC ISO string after changing time fields', async () => {
    await pickerPage.setHour(10);
    await pickerPage.setMinute(30);
    await pickerPage.setSecond(15);
    const text = await pickerPage.getOutputText();
    expect(text).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});
