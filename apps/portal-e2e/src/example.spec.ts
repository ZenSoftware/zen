import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/login');

  expect(await page.locator('[type=submit]').innerText()).toContain('Login');
});
