import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { APIUtils } from "../utils/APIUtils";

test.only('UI Validation of QA Cloud Application', async({page, context, request}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.openLogin();
    await loginPage.login(process.env.QA_USERNAME!, process.env.QA_PASSWORD!);
    await loginPage.verifyLogin("SubhaQA");

    const profilePage = new ProfilePage(page);
    const cookies = await context.cookies();
    const tokenCookie = cookies.find(c => c.name === "token");
    const token = tokenCookie?.value;
    console.log("Token retrieved : ",token);

    const apiUtils = new APIUtils(request);
    const profileAPIResponse = await apiUtils.getProfileDetails(token!);
    await profilePage.verifyWelcome(profileAPIResponse.username);
    await profilePage.verifyApiKeyVisible(profileAPIResponse.api_key);
    await profilePage.verifyEmail(profileAPIResponse.email);

})