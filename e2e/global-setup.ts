import { Browser, chromium, FullConfig, Page } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, httpCredentials, storageState } = config.projects[0].use;
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  //const page = await browser.newPage();
  //await page.goto(baseURL!);
  //await page.waitForLoadState('networkidle');
  await page.goto(`${baseURL}api/auth/login`!);
  await page.getByLabel('Email').fill(httpCredentials?.username || '');
  await page.getByLabel('Password').fill(httpCredentials?.password || '');
  await page.getByLabel('Log In').click();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;