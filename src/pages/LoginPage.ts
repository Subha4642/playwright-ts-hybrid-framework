import { Page, Locator, expect} from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly getStarted: Locator;
    readonly loginTab: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly welcomeText: Locator;
    readonly pageLogo: Locator;
    readonly rentalopenApp: Locator;

constructor(page: Page) { 
    this.page = page;
    this.getStarted = page.locator("#heroBtn"); 
    this.loginTab = page.locator("#modalLoginTab"); 
    this.usernameInput = page.getByPlaceholder ("Username or Email");
    this.passwordInput = page.locator("#loginPassword");
    this.loginButton = page.locator('#modalLoginForm').getByRole("button", {name: "Login"});
    this.welcomeText = page.locator("#heroName");
    this.pageLogo = page.getByAltText("qacloud");
    this.rentalopenApp = page.locator("[href='/rental.html']");
}


async navigate(){
     await this.page.goto(process.env.BASE_URL!);
}

async openLogin() {
    await this.getStarted.click();
    await this.loginTab.click();
}


async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
}

async verifyLogin (username: string) {
    const welcomeName = new RegExp(`^Welcome back,\\s*${username}$`);
    await expect (this.welcomeText).toHaveText(welcomeName);
    await expect(this.page).toHaveURL(/profile.html/);
}


async navigateToRental() {
    // await this.pageLogo.click();
    await this.rentalopenApp.click();
}

}