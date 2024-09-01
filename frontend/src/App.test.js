import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('admin@gmail.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('123456789');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Manage Menu Items' }).click();
  await page.getByRole('button', { name: 'Admin Dashboard' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('user@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456789');
  await page.getByPlaceholder('Password').press('Enter');
  await page.getByRole('link', { name: 'Menu Items' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('main > ul > li > button').first().click();
  await page.locator('li').filter({ hasText: 'Go to Cart (1)' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Remove' }).click();

});