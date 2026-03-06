import { test, expect } from '@playwright/test';
import { DatetimePickerPage } from './pages/datetime-picker.page';

test.describe('Short-Form Time Labels and Reduced Input Width', () => {
  let pickerPage: DatetimePickerPage;

  test.beforeEach(async ({ page }) => {
    pickerPage = new DatetimePickerPage(page);
    await pickerPage.goto();
  });

  test('should display short-form labels: Date, Hr, Min, Sec, Ms', async ({ page }) => {
    const picker = page.locator('qb-datetime-picker').first();
    const labels = picker.locator('mat-label');
    await expect(labels).toHaveCount(5);
    await expect(labels.nth(0)).toHaveText('Date');
    await expect(labels.nth(1)).toHaveText('Hr');
    await expect(labels.nth(2)).toHaveText('Min');
    await expect(labels.nth(3)).toHaveText('Sec');
    await expect(labels.nth(4)).toHaveText('Ms');
  });

  test('should render time fields narrower than the Date field', async ({ page }) => {
    const formFields = page.locator('qb-datetime-picker').first().locator('mat-form-field');
    const dateFieldWidth = (await formFields.nth(0).boundingBox())!.width;
    for (let i = 1; i <= 4; i++) {
      const timeFieldWidth = (await formFields.nth(i).boundingBox())!.width;
      expect(timeFieldWidth).toBeLessThan(dateFieldWidth);
    }
  });

  test('should still allow changing time values after label shortening', async () => {
    const before = await pickerPage.getOutputText();
    await pickerPage.setHour(7);
    await pickerPage.setMinute(22);
    await pickerPage.setSecond(45);
    const after = await pickerPage.getOutputText();
    expect(after).not.toBe(before);
    expect(after).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});
