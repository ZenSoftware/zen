import { expect, test } from '@playwright/test';

test(`submit button has 'Login' for text`, async ({ page }) => {
  await page.goto('/login');

  expect(await page.locator('[type=submit]').innerText()).toContain('Login');
});
