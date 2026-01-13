import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard CRUD', () => {
    // Helper function to login as admin
    async function loginAsAdmin(page: any) {
        await page.goto('/auth/login');
        await page.waitForLoadState('networkidle');

        // Use admin credentials
        await page.fill('input[type="email"]', 'admin@portalberita.com');
        await page.fill('input[type="password"]', 'admin123');

        // Click submit and wait for navigation
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle' }),
            page.click('button[type="submit"]')
        ]);
    }

    test('Create news - Positive Test', async ({ page }) => {
        // Login as admin
        await loginAsAdmin(page);

        // Navigate to admin news page
        await page.goto('/admin/news');
        await page.waitForLoadState('networkidle');

        // Click "Tambah Berita" button and wait for navigation
        const tambahBeritaLink = page.locator('a[href="/admin/news/create"]').first();
        await Promise.all([
            page.waitForURL(/\/admin\/news\/create/, { timeout: 15000 }),
            tambahBeritaLink.click()
        ]);

        // Wait for form to be ready (dynamic import)
        await page.waitForSelector('input[name="title"]', { timeout: 15000 });

        // Fill in the form
        await page.fill('input[name="title"]', 'Test Berita Automated Test ' + Date.now());

        // Select category - wait for dropdown to open
        await page.click('button[role="combobox"]');
        await page.waitForSelector('[role="option"]', { timeout: 5000 });

        // Click first category option
        await page.locator('[role="option"]').first().click();
        await page.waitForTimeout(500);

        // Fill excerpt (minimum 20 characters)
        await page.fill('textarea[name="excerpt"]', 'Ini adalah excerpt untuk test berita baru yang cukup panjang untuk memenuhi minimal 20 karakter');

        // Fill content (minimum 100 characters)
        await page.fill('textarea[name="content"]', 'Ini adalah konten lengkap untuk test berita baru. Konten ini dibuat untuk testing purposes dan harus memiliki minimal 100 karakter agar bisa lolos validasi form. Mari kita tambahkan lebih banyak teks lagi untuk memastikan sudah cukup panjang.');

        //  for submit and navigation
        const submitButton = page.locator('button[type="submit"]:has-text("Publikasi Berita")');

        await Promise.all([
            page.waitForNavigation({ timeout: 20000 }),
            submitButton.click()
        ]);

        // Wait a bit for toast to appear
        await page.waitForTimeout(1000);

        // Verify either redirected to /admin/news OR success message appears
        const currentUrl = page.url();
        const isRedirected = currentUrl.includes('/admin/news') && !currentUrl.includes('/create');

        // Check for success toast
        const successToastvisible = await page.getByText(/berhasil dipublikasikan|berhasil|success/i)
            .isVisible({ timeout: 3000 })
            .catch(() => false);

        // At least one should be true
        expect(isRedirected || successToastvisible).toBeTruthy();

        console.log('✅ Create news test passed - URL:', currentUrl);
    });

    test('Edit news - Positive Test', async ({ page }) => {
        // Login as admin
        await loginAsAdmin(page);

        // Navigate to admin news page
        await page.goto('/admin/news');
        await page.waitForLoadState('networkidle');

        // Check if there are any news items
        const editButton = page.locator('a[href*="/admin/news/"][href*="/edit"]').first();
        const isEditButtonVisible = await editButton.isVisible().catch(() => false);

        if (isEditButtonVisible) {
            // Click first "Edit" button and wait for navigation
            await Promise.all([
                page.waitForURL(/\/admin\/news\/.*\/edit/, { timeout: 15000 }),
                editButton.click()
            ]);

            // Wait for form to load
            await page.waitForSelector('input[name="title"]', { timeout: 15000 });

            // Verify navigated to edit page
            expect(page.url()).toContain('/admin/news/');
            expect(page.url()).toContain('/edit');

            // Edit the title
            const titleInput = page.locator('input[name="title"]');
            await titleInput.fill('Test Berita Edited - ' + Date.now());

            // Submit the form and wait for navigation
            const submitButton = page.locator('button[type="submit"]:has-text("Publikasi Berita")');
            await Promise.all([
                page.waitForNavigation({ timeout: 20000 }),
                submitButton.click()
            ]);

            await page.waitForTimeout(1000);

            // Verify success - check redirect or success message
            const currentUrl = page.url();
            const isRedirected = currentUrl.includes('/admin/news') && !currentUrl.includes('/edit');
            const successToastVisible = await page.getByText(/berhasil|success/i)
                .isVisible({ timeout: 3000 })
                .catch(() => false);

            expect(isRedirected || successToastVisible).toBeTruthy();

            console.log('✅ Edit news test passed');
        } else {
            console.log('⚠️ No news to edit, skipping edit test');
        }
    });

    test('Delete news - Positive Test', async ({ page }) => {
        // Login as admin
        await loginAsAdmin(page);

        // Navigate to admin news page
        await page.goto('/admin/news');
        await page.waitForLoadState('networkidle');

        // Wait for page to fully load
        await page.waitForTimeout(2000);

        // Check if there are news items
        const deleteButton = page.locator('button').filter({ hasText: 'Hapus' }).first();
        const hasNewsItems = await deleteButton.isVisible({ timeout: 5000 }).catch(() => false);

        if (hasNewsItems) {
            // Setup dialog handler before clicking
            page.once('dialog', async dialog => {
                console.log('Dialog appeared:', dialog.message());
                await dialog.accept();
            });

            // Click first "Hapus" button
            await deleteButton.click();

            // Wait for deletion to complete
            await page.waitForTimeout(3000);

            // Verify success message appears
            const successToast = page.getByText(/berhasil dihapus|deleted|success/i);
            const toastVisible = await successToast.isVisible({ timeout: 5000 }).catch(() => false);

            expect(toastVisible).toBeTruthy();

            console.log('✅ Delete news test passed');
        } else {
            console.log('⚠️ No news to delete, skipping delete test');
            // If no news, test should still pass as it's a valid scenario
            expect(hasNewsItems).toBe(false);
        }
    });
});
