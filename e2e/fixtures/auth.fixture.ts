/*import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

type AuthFixtures = {
  loginPage: LoginPage
}

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await use(loginPage)
  },
})

export { expect } from '@playwright/test'*/