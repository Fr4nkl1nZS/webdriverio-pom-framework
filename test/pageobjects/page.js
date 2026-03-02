export default class Page {
constructor() {
    this.title = 'My Page';
}

async open(path) {
    await browser.url(path);
}

async waitAndClick(element) {
    await element.waitForClickable({ timeout: 5000});
    await element.click();
}

async waitAndSetValue(element, value) {
    await element.waitForDisplayed({ timeout: 5000});
    await element.setValue(value);
}

async takeScreenShots(testName) {
    const timestamp = new Date().getTime();
    const filePath = './screenshots/${testName}-${timestamp}.png';
    await browser.saveScreenshot(filePath);
    console.log('📸 Screenshot saved: ${filePath}');
}

}