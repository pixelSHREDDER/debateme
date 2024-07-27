/*import type { Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('http://localhost:5173/api/auth/login')
    await this.page.waitForURL('http://localhost:5173/api/auth/login')
  }
  async populateForm(username: string, password: string) {
    await this.page.fill('#1-email', username)
    await this.page.fill('#1-password', password)
  }
}*/