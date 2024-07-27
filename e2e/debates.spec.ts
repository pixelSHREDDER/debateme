import { expect, test } from '@playwright/test'
import prisma from '../tests/helpers/prisma'
import { beforeEach } from 'node:test';

test.describe('debates', () => {
  test.use({ storageState: './authState.json' })
  let debateData;

  test('should add a new debate to the database', async ({
    page
  }) => {
    /*await page.goto('http://localhost:3000/api/auth/login')
    await page.getByLabel('Log In').click()
    await page.waitForSelector('text=Welcome',{timeout:25000})
    const auth0StorageState = './authState.json'
    await page.context().storageState({
      path: auth0StorageState,
    })*/




    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    try {
      debateData = await prisma.debate.findMany({
        where: { creatorSub: process.env.AUTH0_TEST_USER },
        select: { id: true },
        orderBy: [{ createdAt: 'desc' }]
      })
    } catch (error: any) {
      throw new Error(error)
    }
    expect(debateData).toHaveLength(5)

    await page.goto('http://localhost:3000/debate')
    await page.waitForLoadState('networkidle')
    await page.fill('#topic', 'test topic')
    await page.fill('#cooldownMins', '60')
    await page.click('Start Debating!')
    await page.waitForLoadState('networkidle')
    //await expect(page.getByText('Login')).toBeVisible()
    try {
      debateData = await prisma.debate.findFirst({
        where: { creatorSub: process.env.AUTH0_TEST_USER },
        select: { id: true },
        orderBy: [{ createdAt: 'desc' }]
      })
    } catch (error: any) {
      throw new Error(error)
    }
    expect(debateData).toHaveLength(6)
  })
})