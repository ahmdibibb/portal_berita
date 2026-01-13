import { test, expect } from '@playwright/test';

test.describe('News Interaction', () => {
    // Helper function to login
    async function loginAsUser(page: any) {
        // Create unique user for this test session
        const timestamp = Date.now();
        const userData = {
            name: 'Test User',
            email: `testuser${timestamp}@test.com`,
            password: 'password123'
        };

        // Register
        await page.goto('/auth/register');
        await page.waitForLoadState('networkidle');
        await page.fill('input[name="name"]', userData.name);
        await page.fill('input[name="email"]', userData.email);
        await page.fill('input[name="password"]', userData.password);
        await page.fill('input[name="confirmPassword"]', userData.password);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000);

        return userData;
    }

    test('Like news - Positive Test', async ({ page }) => {
        // Login as user
        await loginAsUser(page);

        // Navigate to home and click on first news
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const firstNewsLink = page.locator('a[href^="/news/"]').first();
        await firstNewsLink.click();
        await page.waitForLoadState('networkidle');

        // Find like button - button with Heart icon
        const likeButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /\d+/ }).first();
        await expect(likeButton).toBeVisible({ timeout: 30000 });

        // Click like button
        await likeButton.click();
        await page.waitForTimeout(1500);

        // Verify toast message appears
        const successToast = page.getByText(/Menyukai berita|liked/i);
        await expect(successToast).toBeVisible({ timeout: 5000 });

        console.log('✅ Like news test passed');
    });

    test('Unlike news - Positive Test', async ({ page }) => {
        // Login as user
        await loginAsUser(page);

        // Navigate to home and click on first news
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const firstNewsLink = page.locator('a[href^="/news/"]').first();
        await firstNewsLink.click();
        await page.waitForLoadState('networkidle');

        // Find like button
        const likeButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /\d+/ }).first();
        await expect(likeButton).toBeVisible({ timeout: 30000 });

        // Like first
        await likeButton.click();
        await page.waitForTimeout(1500);

        // Then unlike
        await likeButton.click();
        await page.waitForTimeout(1500);

        // Verify unlike toast message
        const unlikeToast = page.getByText(/Batal menyukai|unliked/i);
        await expect(unlikeToast).toBeVisible({ timeout: 5000 });

        console.log('✅ Unlike news test passed');
    });

    test('Comment on news - Positive Test', async ({ page }) => {
        // Login as user
        await loginAsUser(page);

        // Navigate to home and click on first news
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const firstNewsLink = page.locator('a[href^="/news/"]').first();
        await firstNewsLink.click();
        await page.waitForLoadState('networkidle');

        // Scroll to comment section
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Find comment textarea
        const commentTextarea = page.locator('textarea').first();
        await expect(commentTextarea).toBeVisible({ timeout: 10000 });

        // Enter comment
        const commentText = `Test comment ${Date.now()}`;
        await commentTextarea.fill(commentText);

        // Submit comment
        const submitButton = page.locator('button[type="submit"]').filter({ hasText: /Kirim|Submit/i }).first();
        await submitButton.click();
        await page.waitForTimeout(2000);

        // Verify comment appears in the list
        await expect(page.getByText(commentText)).toBeVisible({ timeout: 5000 });

        console.log('✅ Comment test passed');
    });

    test('Like without login - Negative Test', async ({ page }) => {
        // Navigate to news detail WITHOUT logging in
        await page.goto('/');
        await page.waitForTimeout(3000);

        const firstNewsLink = page.locator('a[href^="/news/"]').first();
        await firstNewsLink.click();
        await page.waitForTimeout(3000);

        // Try to click like button
        const likeButton = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /\d+/ }).first();
        await likeButton.click();
        await page.waitForTimeout(1500);

        // Should show error toast "Login diperlukan"
        const errorToast = page.getByText(/Login diperlukan|login required/i);
        const isErrorVisible = await errorToast.isVisible({ timeout: 5000 }).catch(() => false);

        // OR check if redirected to login
        const currentUrl = page.url();
        const isRedirectedToLogin = currentUrl.includes('/auth/login');

        expect(isErrorVisible || isRedirectedToLogin).toBeTruthy();

        console.log('✅ Like without login test passed');
    });

    test('Comment without login - Negative Test', async ({ page }) => {
        // Navigate to news detail WITHOUT logging in
        await page.goto('/');
        await page.waitForTimeout(3000);

        const firstNewsLink = page.locator('a[href^="/news/"]').first();
        await firstNewsLink.click();
        await page.waitForTimeout(3000);

        // Scroll to comment section
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Check if comment form is visible or if there's a login prompt
        const commentTextarea = page.locator('textarea').first();
        const isCommentFormVisible = await commentTextarea.isVisible({ timeout: 5000 }).catch(() => false);

        if (isCommentFormVisible) {
            // Try to submit comment
            await commentTextarea.fill('Test comment without login');
            const submitButton = page.locator('button[type="submit"]').filter({ hasText: /Kirim|Submit/i }).first();
            await submitButton.click();
            await page.waitForTimeout(1500);

            // Should show error or redirect to login
            const errorToast = page.getByText(/Login diperlukan|login required/i);
            const isErrorVisible = await errorToast.isVisible({ timeout: 5000 }).catch(() => false);
            const currentUrl = page.url();

            expect(isErrorVisible || currentUrl.includes('/auth/login')).toBeTruthy();
        } else {
            // Comment form not visible (requires login) - this is expected
            expect(isCommentFormVisible).toBe(false);
        }

        console.log('✅ Comment without login test passed');
    });
});
