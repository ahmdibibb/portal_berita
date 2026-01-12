import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test('Register -> Login -> Logout (Positive Test)', async ({ page }) => {
        // Data user dengan timestamp untuk unique email
        const timestamp = Date.now();
        const userData = {
            name: 'Test User',
            email: `user${timestamp}@test.com`,
            password: 'password123'
        };

        // STEP 1: Register
        await page.goto('/auth/register');
        await page.fill('input[name="name"]', userData.name);
        await page.fill('input[name="email"]', userData.email);
        await page.fill('input[name="password"]', userData.password);
        await page.fill('input[name="confirmPassword"]', userData.password);
        await page.click('button[type="submit"]');

        // Tunggu 5 detik untuk redirect
        await page.waitForTimeout(5000);
        console.log('✅ Registration completed');

        // STEP 2: Login
        await page.fill('input[type="email"]', userData.email);
        await page.fill('input[type="password"]', userData.password);
        await page.click('button[type="submit"]');

        // Tunggu 5 detik untuk redirect
        await page.waitForTimeout(5000);
        console.log('✅ Login completed');

        // STEP 3: Logout
        await page.goto('/api/auth/logout', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);

        // Verifikasi sudah logout - cek tombol "SIGN IN" muncul
        await expect(page.getByText('SIGN IN')).toBeVisible();
        console.log('✅ Logout completed');
    });

    test('Login dengan password salah (Negative Test)', async ({ page }) => {
        await page.goto('/auth/login');

        // Gunakan akun dari seed data tapi password salah
        await page.fill('input[type="email"]', 'user@portalberita.com');
        await page.fill('input[type="password"]', 'wrongpassword123');
        await page.click('button[type="submit"]');

        // Tunggu 3 detik
        await page.waitForTimeout(3000);

        // Harus tetap di halaman login (tidak redirect)
        await expect(page).toHaveURL(/.*\/auth\/login/);
        console.log('✅ Negative test passed - invalid password rejected');
    });

    test('Register dengan email yang sudah terdaftar (Negative Test)', async ({ page }) => {
        await page.goto('/auth/register');

        // Gunakan email yang sudah ada di seed data
        await page.fill('input[name="name"]', 'Duplicate User');
        await page.fill('input[name="email"]', 'user@portalberita.com');
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'password123');
        await page.click('button[type="submit"]');

        // Tunggu 3 detik
        await page.waitForTimeout(3000);

        // Harus tetap di halaman register (tidak redirect)
        await expect(page).toHaveURL(/.*\/auth\/register/);
        console.log('✅ Negative test passed - duplicate email rejected');
    });

    test('Register dengan password tidak match (Negative Test)', async ({ page }) => {
        await page.goto('/auth/register');

        const timestamp = Date.now();
        await page.fill('input[name="name"]', 'Test User');
        await page.fill('input[name="email"]', `test${timestamp}@example.com`);
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmPassword"]', 'differentpassword');
        await page.click('button[type="submit"]');

        // Tunggu 2 detik
        await page.waitForTimeout(2000);

        // Harus tetap di halaman register
        await expect(page).toHaveURL(/.*\/auth\/register/);
        console.log('✅ Negative test passed - password mismatch rejected');
    });

    test('Login dengan email yang tidak terdaftar (Negative Test)', async ({ page }) => {
        await page.goto('/auth/login');

        await page.fill('input[type="email"]', 'notexist@example.com');
        await page.fill('input[type="password"]', 'password123');
        await page.click('button[type="submit"]');

        // Tunggu 3 detik
        await page.waitForTimeout(1000);

        // Harus tetap di halaman login
        await expect(page).toHaveURL(/.*\/auth\/login/);
        console.log('✅ Negative test passed - non-existent user rejected');
    });
});
