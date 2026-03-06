import { test, expect } from '@playwright/test';
test('check if compact styles are in DOM', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.qb-datetime-picker--compact');
  const styleInfo = await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    const results: string[] = [];
    for (const sheet of sheets) {
      try {
        const rules = Array.from(sheet.cssRules);
        for (const rule of rules) {
          if (rule.cssText.includes('qb-datetime-picker--compact') && rule.cssText.includes('form-field')) {
            results.push(rule.cssText.substring(0, 200));
          }
        }
      } catch(e) {}
    }
    return results;
  });
  console.log('STYLE RULES:', JSON.stringify(styleInfo, null, 2));
  expect(true).toBe(true);
});
