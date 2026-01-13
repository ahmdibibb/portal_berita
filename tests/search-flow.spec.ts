import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
    test('Search dengan hasil - Positive Test', async ({ page }) => {
        // Navigate to home page
        await page.goto('/');

        // Tunggu halaman load
        await page.waitForTimeout(3000);

        // Cari search input di navbar
        const searchInput = page.locator('input[type="search"]').first();

        // Masukkan query pencarian "chelsea"
        await searchInput.fill('chelsea');

        // Submit search form dengan menekan Enter
        await searchInput.press('Enter');

        // Tunggu navigasi ke halaman search (lebih lama untuk memastikan data dimuat)
        await page.waitForTimeout(5000);

        // Verifikasi URL mengandung query parameter
        expect(page.url()).toContain('/search?q=chelsea');

        // Verifikasi header "Hasil Pencarian" muncul
        await expect(page.locator('text=Hasil Pencarian')).toBeVisible();

        console.log('✅ Search dengan hasil test passed');
    });

    test('Search tanpa hasil - Negative Test', async ({ page }) => {
        // Navigate to home page
        await page.goto('/');
        await page.waitForTimeout(3000);

        // Cari search input
        const searchInput = page.locator('input[type="search"]').first();

        // Masukkan query yang tidak akan ada hasilnya
        const timestamp = Date.now();
        const searchQuery = `tidakadahasilnya${timestamp}`;
        await searchInput.fill(searchQuery);

        // Submit search
        await searchInput.press('Enter');

        // Tunggu navigasi dan loading
        await page.waitForTimeout(5000);

        // Verifikasi URL mengandung query parameter
        expect(page.url()).toContain(`/search?q=${searchQuery}`);

        // Verifikasi pesan "Tidak Ada Hasil" muncul
        await expect(page.locator('text=Tidak Ada Hasil')).toBeVisible();

        console.log('✅ Search tanpa hasil test passed');
    });
});
