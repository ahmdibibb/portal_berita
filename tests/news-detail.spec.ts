import { test, expect } from '@playwright/test';

test.describe('News Detail Page', () => {
    test('View existing news detail - Positive Test', async ({ page }) => {
        // Navigate to home page
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Wait for news cards to load
        await page.waitForSelector('a[href^="/news/"]', { timeout: 10000 });

        // Get first news link from the page - use h3 title link as it's more reliable
        const firstNewsLink = page.locator('a[href^="/news/"] h3').first();
        await expect(firstNewsLink).toBeVisible({ timeout: 10000 });

        // Get parent link element to extract href
        const parentLink = page.locator('a[href^="/news/"]').first();
        const href = await parentLink.getAttribute('href');
        console.log('Clicking news link:', href);

        // Click to navigate to news detail - use Promise.all to wait for navigation
        await Promise.all([
            page.waitForURL(/\/news\/\d+/, { timeout: 15000 }),
            firstNewsLink.click()
        ]);

        // Verify URL is correct
        expect(page.url()).toContain('/news/');
        console.log('Navigated to:', page.url());

        // Wait for page to fully load
        await page.waitForLoadState('networkidle');

        // Verify news detail components are visible
        // News title should be in h1 or h2
        const newsTitle = page.locator('h1, h2').first();
        await expect(newsTitle).toBeVisible({ timeout: 10000 });

        // Verify we have content on the page
        const mainContent = page.locator('main, article, [class*="content"]').first();
        await expect(mainContent).toBeVisible({ timeout: 10000 });

        console.log('✅ News detail page test passed');
    });

    test('Access non-existent news - Negative Test', async ({ page }) => {
        // Try to access news with very high ID that likely doesn't exist
        await page.goto('/news/999999');
        await page.waitForLoadState('networkidle');

        // Verify either error message appears OR redirected away from /news/999999
        const currentUrl = page.url();
        console.log('Current URL for non-existent news:', currentUrl);

        // Check if still on the non-existent news page
        if (currentUrl.includes('/news/999999')) {
            // Should show error message or empty state
            const errorIndicators = [
                page.getByText(/tidak ditemukan/i),
                page.getByText(/not found/i),
                page.getByText(/error/i),
                page.getByText(/404/i),
                page.getByText(/berita tidak ada/i)
            ];

            // At least one error indicator should be visible
            let errorFound = false;
            for (const indicator of errorIndicators) {
                if (await indicator.isVisible({ timeout: 2000 }).catch(() => false)) {
                    errorFound = true;
                    console.log('Error indicator found');
                    break;
                }
            }

            // If no error message, check if page is mostly empty (no main content)
            if (!errorFound) {
                const hasMainContent = await page.locator('article, [class*="NewsDetail"]').count();
                expect(hasMainContent).toBe(0);
            } else {
                expect(errorFound).toBe(true);
            }
        } else {
            // Redirected away, which is also acceptable
            console.log('Redirected away from non-existent news');
            expect(currentUrl).not.toContain('/news/999999');
        }

        console.log('✅ Non-existent news test passed');
    });
});
