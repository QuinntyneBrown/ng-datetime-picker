import { test, expect } from '@playwright/test';
test('diagnose compact padding', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.qb-datetime-picker--compact');
  const data = await page.evaluate(() => {
    const compact = document.querySelector('.qb-datetime-picker--compact');
    const field = compact!.querySelector('mat-form-field')!;
    const infix = field.querySelector('.mat-mdc-form-field-infix')!;
    const flex = field.querySelector('.mat-mdc-form-field-flex')!;
    const outline = field.querySelector('.mdc-notched-outline')!;
    const input = field.querySelector('input')!;
    const subscript = field.querySelector('.mat-mdc-form-field-subscript-wrapper');
    const notch = field.querySelector('.mdc-notched-outline__notch');
    const infixStyle = getComputedStyle(infix);
    const flexStyle = getComputedStyle(flex);
    return {
      infixPadTop: infixStyle.paddingTop,
      infixPadBot: infixStyle.paddingBottom,
      infixMinHeight: infixStyle.minHeight,
      flexHeight: flexStyle.height,
      flexAlignItems: flexStyle.alignItems,
      subscriptDisplay: subscript ? getComputedStyle(subscript).display : 'N/A',
      notchDisplay: notch ? getComputedStyle(notch).display : 'N/A',
      outlineH: Math.round(outline.getBoundingClientRect().height),
      flexH: Math.round(flex.getBoundingClientRect().height),
      inputH: Math.round(input.getBoundingClientRect().height),
      infixH: Math.round(infix.getBoundingClientRect().height),
      inputTopInOutline: Math.round(input.getBoundingClientRect().top - outline.getBoundingClientRect().top),
      inputBotInOutline: Math.round(outline.getBoundingClientRect().bottom - input.getBoundingClientRect().bottom),
    };
  });
  console.log('DIAG:', JSON.stringify(data, null, 2));
  expect(true).toBe(true);
});
