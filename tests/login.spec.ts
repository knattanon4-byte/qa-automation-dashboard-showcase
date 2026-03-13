import { test, expect } from '@playwright/test';

// Group เทสไว้ด้วยกัน และจัดการ URL ที่เดียว
test.describe('Login Functionality', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('http://127.0.0.1:5500/index.html');
    });

    test('TC-001: ล็อกอินสำเร็จและเข้าสู่หน้า Dashboard', async ({ page }) => {
        await page.fill('#username', 'Admin');
        await page.fill('#password', '123456');
        await page.click('#Login-btn');
        await expect(page.locator('#dashboard-page')).toBeVisible();
    });

    test('TC-002: แจ้งเตือนเมื่อลืมใส่รหัสผ่าน', async ({ page }) => {
        await page.fill('#username', 'Admin');

        // ใช้ once เพื่อความกระชับและลด Side effect
        page.once('dialog', async dialog => {
            expect(dialog.message()).toBe('กรุณาใส่ Username และ Password ให้ครบถ้วนครับ!');
            await dialog.accept();
        });

        await page.click('#Login-btn');
        await expect(page.locator('#login-page')).toBeVisible();
    });

    test('TC-003: ทดสอบหน้า Dashboard', async ({ page }) =>{
      //ล็อคอินก่อน
       await page.fill('#username', 'Admin');
       await page.fill('#password', '123456');
       await page.click('#Login-btn');
       //เช็คว่าโลโก้ขึ้นมั้ย
       await expect(page.locator('.logo')).toHaveText('NATTANON');
       //เช้คตารางด้วย ID ที่ตั้งไว้ 
       const tableBody = page.locator('#home-quote-table-body');
       await expect(tableBody).toBeVisible();
       //เช็คข้อมูลที่ม็อคอัพเอาไว้ใน HTML
       await expect(tableBody).toContainText('First Tech');
       await expect(tableBody).toContainText('800,000');

    });

    
});