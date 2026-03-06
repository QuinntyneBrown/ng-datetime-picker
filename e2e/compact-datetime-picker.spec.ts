import { test, expect } from '@playwright/test';

test.describe('Compact DateTime Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.qb-datetime-picker--compact');
  });

  test('should render the compact variant with the compact class', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    await expect(compactPicker).toBeVisible();
  });

  test('should render all five form fields in compact mode', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const formFields = compactPicker.locator('mat-form-field');
    await expect(formFields).toHaveCount(5);
  });

  test('should have outline appearance on all compact form fields', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const fields = compactPicker.locator('mat-form-field');
    const count = await fields.count();
    for (let i = 0; i < count; i++) {
      const hasOutline = await fields.nth(i).evaluate((el) =>
        el.classList.contains('mat-form-field-appearance-outline')
      );
      expect(hasOutline).toBe(true);
    }
  });

  test('should have a smaller gap than the standard picker', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const compactGap = await compactPicker.evaluate((el) =>
      getComputedStyle(el).gap
    );
    const standardPicker = page.locator('.qb-datetime-picker:not(.qb-datetime-picker--compact)');
    const standardGap = await standardPicker.evaluate((el) =>
      getComputedStyle(el).gap
    );
    expect(parseFloat(compactGap)).toBeLessThan(parseFloat(standardGap));
  });

  test('should display a selected date on initial load', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const text = await output.textContent();
    expect(text).not.toBe('None');
  });

  test('should output UTC ISO 8601 format', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const text = await output.textContent();
    expect(text).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  test('should update output when hour is changed in compact picker', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const before = await output.textContent();

    const hourInput = page.locator('.qb-datetime-picker--compact input[type="number"]').nth(0);
    await hourInput.fill('15');
    await hourInput.press('Tab');

    const after = await output.textContent();
    expect(after).not.toBe(before);
  });

  test('should update output when minute is changed in compact picker', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const before = await output.textContent();

    const minuteInput = page.locator('.qb-datetime-picker--compact input[type="number"]').nth(1);
    await minuteInput.fill('45');
    await minuteInput.press('Tab');

    const after = await output.textContent();
    expect(after).not.toBe(before);
  });

  test('should update output when second is changed in compact picker', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const before = await output.textContent();

    const secondInput = page.locator('.qb-datetime-picker--compact input[type="number"]').nth(2);
    await secondInput.fill('30');
    await secondInput.press('Tab');

    const after = await output.textContent();
    expect(after).not.toBe(before);
  });

  test('should update output when millisecond is changed in compact picker', async ({ page }) => {
    const output = page.locator('.compact-output strong');
    const before = await output.textContent();

    const msInput = page.locator('.qb-datetime-picker--compact input[type="number"]').nth(3);
    await msInput.fill('456');
    await msInput.press('Tab');

    const after = await output.textContent();
    expect(after).not.toBe(before);
  });

  test('should have reduced container height CSS variable', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const containerHeight = await compactPicker.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--mat-form-field-container-height')
    );
    expect(containerHeight.trim()).toBe('40px');
  });

  test('should have all form fields at the same height in compact mode', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const fields = compactPicker.locator('mat-form-field');
    const count = await fields.count();
    expect(count).toBe(5);

    const heights: number[] = [];
    for (let i = 0; i < count; i++) {
      const box = await fields.nth(i).boundingBox();
      expect(box).not.toBeNull();
      heights.push(Math.round(box!.height));
    }

    // All form fields should have exactly the same height
    const firstHeight = heights[0];
    for (let i = 1; i < heights.length; i++) {
      expect(heights[i], `Field ${i} height ${heights[i]} !== field 0 height ${firstHeight}`).toBe(firstHeight);
    }
  });

  test('should have equal padding above and below each input in compact mode', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const fields = compactPicker.locator('mat-form-field');
    const count = await fields.count();
    expect(count).toBe(5);

    for (let i = 0; i < count; i++) {
      const field = fields.nth(i);

      // Measure the input's vertical position within the visible outline border
      const paddings = await field.evaluate((el) => {
        const outline = el.querySelector('.mdc-notched-outline');
        const input = el.querySelector('input');
        if (!outline || !input) return null;
        const outlineRect = outline.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        return {
          top: Math.round(inputRect.top - outlineRect.top),
          bottom: Math.round(outlineRect.bottom - inputRect.bottom),
        };
      });

      expect(paddings).not.toBeNull();
      expect(
        paddings!.top,
        `Field ${i}: top padding (${paddings!.top}px) should equal bottom padding (${paddings!.bottom}px)`
      ).toBe(paddings!.bottom);
    }
  });

  test('should be visually shorter than the standard picker', async ({ page }) => {
    const standardPicker = page.locator('.qb-datetime-picker:not(.qb-datetime-picker--compact)');
    const compactPicker = page.locator('.qb-datetime-picker--compact');

    const standardHeight = (await standardPicker.boundingBox())!.height;
    const compactHeight = (await compactPicker.boundingBox())!.height;

    expect(compactHeight).toBeLessThan(standardHeight);
  });

  test('should have time fields narrower than the date field in compact mode', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const formFields = compactPicker.locator('mat-form-field');
    const dateFieldBox = await formFields.nth(0).boundingBox();
    expect(dateFieldBox).not.toBeNull();

    for (let i = 1; i <= 4; i++) {
      const timeFieldBox = await formFields.nth(i).boundingBox();
      expect(timeFieldBox).not.toBeNull();
      expect(
        timeFieldBox!.width,
        `Time field ${i} (${timeFieldBox!.width}px) should be narrower than Date field (${dateFieldBox!.width}px)`
      ).toBeLessThan(dateFieldBox!.width);
    }
  });

  test('should have time fields at roughly half the width of the date field', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const formFields = compactPicker.locator('mat-form-field');
    const dateFieldWidth = (await formFields.nth(0).boundingBox())!.width;

    for (let i = 1; i <= 4; i++) {
      const timeFieldWidth = (await formFields.nth(i).boundingBox())!.width;
      const ratio = timeFieldWidth / dateFieldWidth;
      // Time fields should be no more than 75% the width of the Date field
      expect(
        ratio,
        `Time field ${i} ratio ${ratio.toFixed(2)} should be <= 0.75`
      ).toBeLessThanOrEqual(0.75);
    }
  });

  test('should have all four time fields at a consistent width in compact mode', async ({ page }) => {
    const compactPicker = page.locator('.qb-datetime-picker--compact');
    const formFields = compactPicker.locator('mat-form-field');

    const timeWidths: number[] = [];
    for (let i = 1; i <= 4; i++) {
      const box = await formFields.nth(i).boundingBox();
      expect(box).not.toBeNull();
      timeWidths.push(Math.round(box!.width));
    }

    // All time fields should be the same width (within 1px tolerance)
    const first = timeWidths[0];
    for (let i = 1; i < timeWidths.length; i++) {
      expect(
        Math.abs(timeWidths[i] - first),
        `Time field ${i + 1} width (${timeWidths[i]}px) should match first time field (${first}px)`
      ).toBeLessThanOrEqual(1);
    }
  });

  test('should have time fields narrower than the date field in standard mode too', async ({ page }) => {
    const standardPicker = page.locator('.qb-datetime-picker:not(.qb-datetime-picker--compact)');
    const formFields = standardPicker.locator('mat-form-field');
    const dateFieldWidth = (await formFields.nth(0).boundingBox())!.width;

    for (let i = 1; i <= 4; i++) {
      const timeFieldWidth = (await formFields.nth(i).boundingBox())!.width;
      expect(
        timeFieldWidth,
        `Standard time field ${i} (${timeFieldWidth}px) should be narrower than Date field (${dateFieldWidth}px)`
      ).toBeLessThan(dateFieldWidth);
    }
  });
});
