import { expect } from 'chai';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import loginPage from '../pageobjects/login.page.js';
const testData = require('../data/test-data.json');

describe('Login suit test', () => {

    beforeEach(async () => {
        await loginPage.open();
    });

    it('TC01 - Login success with valid credentials', async () => {
        //Act
        await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
        );

        //Assert
        const message = await loginPage.getFlashMessageText();
        expect(message).to.include(testData.messages.loginSuccess);
        expect(await loginPage.isLoggedIn()).to.be.true;
    });

    it('TC02 - login failed with invalid credentials', async () => {
        //Act
        await loginPage.login(
            testData.invalidUser.username,
            testData.invalidUser.password
        );

        //Assert
        const message = await loginPage.getFlashMessageText();
        expect(message).to.include(testData.messages.loginFailed);
        expect(await loginPage.isLoggedIn()).to.be.false;
    });

    it('TC3 - logout after success login', async () => {
        //Act
        await loginPage.login(
            testData.validUser.username,
            testData.validUser.password
        );

        //Waiting until charged
        await loginPage.flashMessage.waitForDisplayed();


        //Act - Logout
        await loginPage.logout();

        //Assert
        expect(await loginPage.isLoggedIn()).to.be.false;
    });
});