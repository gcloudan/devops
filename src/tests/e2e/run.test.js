import { test, expect } from '@playwright/test';

test('Title should match expected value', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');
  const title = await page.title();
  expect(title).toBe('Notes Tonight');
});
