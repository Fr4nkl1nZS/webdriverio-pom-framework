export async function waitForText(element, expectText, timeout = 5000) {
    await DESKTOP_BROWSERS.waitUntil(
        async () => {
            const text = await element.getText();
            return text.include(expectText);
        },
        {
            timeout,
            timeoutMsg: `❌ doesn´t found "${expectedText}" after ${timeout}ms` 
        }
    );
}

export async function waitForElementToDisappear(element, timeout = 5000) {
    await DESKTOP_BROWSERS.waitUntil(
        async () => !(await element.isExisting()),
        {
            timeout,
            timeoutMsg: `❌ the element still present after to ${timeout}ms`
        }
    );
}