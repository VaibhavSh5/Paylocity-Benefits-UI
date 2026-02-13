import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import config from './config/env.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginWithCredentials(config.userName, config.password);
  await page.waitForURL('**/Benefits', { timeout: 10000 });
  
  await expect(page.locator('.navbar-brand')).toBeVisible({ timeout: 5000 });
  await page.context().storageState({ path: 'auth.json' });
  
  console.log('Authentication successful - auth.json created');
});
