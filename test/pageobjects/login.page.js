import timeout from 'studio/src/plugin/timeout.js';
import Page from './page.js';

class LoginPage extends Page {
    get username() { return $('#username'); }
    get password() { return $('#password'); }
    get submitButton() { return $('button[type="submit"]'); }
    get flashMessage() { return $('#flash'); }
    get logoutButton() { return $('a.button.secondary.radius'); }

    async open() {
        await super.open('/login');
        console.log('📁 Navigate to login page');
    }

    async login(user, pass) {
        await this.waitAndSetValue(this.username, user);
        await this.waitAndSetValue(this.password, pass);
        await this.waitAndClick(this.submitButton);
    }

    async getFlashMessageText() {
        await this.flashMessage.waitForDisplayed({ timeout: 3000 });
        return await this.flashMessage.getText();
    }

    async isLoggedIn() {
        return await this.logoutButton.isDisplayed();
    }

    async logout() {
        await this.waitAndClick(this.logoutButton);
    }
}

export default new LoginPage();
