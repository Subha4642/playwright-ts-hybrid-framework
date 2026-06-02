import { Page, Locator, expect} from "@playwright/test";

export class ProfilePage {
    readonly page: Page;
    readonly welcomeText: Locator;
    readonly mailAddress: Locator;
    readonly apiKeyText: Locator;
    readonly usernameField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeText = page.locator("#heroName");
        this.mailAddress = page.locator("#heroEmail");
        this.apiKeyText = page.locator("#apiKey");
        this.usernameField = page.locator("#username");
    }

    async verifyWelcome(username: string){
        const welcomeName = new RegExp(`^Welcome back,\\s*${username}$`);
        await expect(this.welcomeText).toHaveText(welcomeName);
    }

    async verifyApiKeyVisible(apiKey: string) {
        await expect(this.apiKeyText).toBeVisible();
        await expect(this.apiKeyText).toContainText(apiKey);
    }

    async verifyEmail(expectedEmail: string) {
        await expect(this.mailAddress).toContainText(expectedEmail);
    }
}