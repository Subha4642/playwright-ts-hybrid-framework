import { test, expect } from "@playwright/test";
import { ProfilePage } from "../pages/ProfilePage";
import { APIUtils } from "../utils/APIUtils";

test('Profile Page Validation', async({page, context, request}) => {

    const profilePage = new ProfilePage(page);
    await page.goto(`${process.env.BASE_URL!}/profile.html`);
    await page.waitForLoadState('networkidle');
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