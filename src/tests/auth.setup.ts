import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const authFile = 'playwright/.auth/user.json';

setup("Authenticate", async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.openLogin();
    await loginPage.login(process.env.QA_USERNAME!, process.env.QA_PASSWORD!);
    await loginPage.verifyLogin(process.env.QA_USERNAME!);
    
    await page.waitForLoadState('networkidle');
    
    const cookies = await page.context().cookies();
    console.log(cookies);
    
    await page.context().storageState({
        path: authFile
    });

});
