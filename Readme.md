markdown

# WebDriverIO POM Testing Framework 🚀

[!WebDriverIO](https://img.shields.io/badge/tested%20with-WebDriverIO-%23ea5906)](https://webdriver.io/)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)](https://www.ecma-international.org/)
[![Mocha](https://img.shields.io/badge/test%20runner-Mocha-brightgreen)](https://mochajs.org/)
["[Chai](https://img.shields.io/badge/assertions-Chai-red)](https://www.chaijs.com/)

A robust and scalable test automation framework built with WebDriverIO (v8+), implementing the **Page Object 
Model (POM)** design pattern. This framework is designed for ent-to-end testing of web applications, witha a 
focus on maintainability, readability, and reducing flaky tests.

## 📋 Table of contents
- [Features](#featutes)
-[Tech Stack](#tech-stack)
-[Project Structure](#project-structure) 
-[Prerequisites](#prerequisites)
-[Installation](#installation)
-[Configuration](#configuration)
-[Running Tests](#running-tests)
-[Test Data Management](#test-data-management)
-[Reporting](#reporting)
-[Best Practices Implementing](#best-practices-implementing)
-[Contribuiting](#contribuiting)
-[Author](#author)

## 🔅 Features

- ✅ **Page Object Model (POM)** - Clean separation between test logic and page-specific code
- ✅ **Automatics waits** - Smart waiting strategies to eliminate flaky tests
- ✅ **Data-Driving Testing** - External JSON test data files
- ✅ **Parallel Execution** - Configured for running tests in parallel 
- ✅ **Screenshot on Failure** - Automatic screenshots for failed tests
- ✅ **Cross-Browser Testing** - Easy configuration for multiple browsers
- ✅ **ES6+ JavaScript** - Modern JavaScript with async/await
- ✅ **Comprehensive Reporting** - Spec reporter with opticl Allure integration

## 🛠️ Tech Stack
- **Test Framework:** WebDriverIo (v8+)
- **Test Runner:** Mocha
- **Assertions:** Chai
- **Design Pattern:** Page Object Models (POM)
- **Language:** JavaScript (ES6+)
- **Browser Automation:** ChromeDriver (auto-managed)

## 📁 Project Structure

 webdriverio-pom-framework/
 |--📁 test/
 | |-- 📁 specs/# Test specifications
 | | - login.spec.js # Login test suite
 | |-- 📁 pageobjects/# Page Object classes
 | | - page.js # Base page class
 | | - login.page.js # Login page Object
 | |-- 📁 data/ # Test Data
 | | - test-data.json # JSON test data 
 | |-- 📁 utils/ # Utility functions
 | | - wait-utils.js # Custom wait strategies
 |-- 📁 screenshots/ # Failure screenshots
 |-- wdio.conf.js # WebDriverIO Configuration
 |-- package.json # Dependencies and scripts
 |-- README.md #Project documentation
 
 ## 📋 Prerequisites
 
 - **Node.ja** (v16 or higher recommended)
 - **npm** (v7 or higher)
 - **Chrome** browser (for default configuration)
 
 ## 🔧 Installation
 
 1. **Clone the repository**
	```bash
	git clone https://github.com/FranklinZS/webdriverio-pom-framework.git 
	cd webdriverio-pom-framework 
	
2. Install dependencies 
	bash 
	npm install 
	
3. Create screenshots directory (if not exists)
	bash 
	npm run screenshots 
	
⚙️ Configuration

The main configuration file is wdio.conf.js. Key configurations include:

* Specs pattern: ./test/specs/**/*.js
* Browser: Chrome (default)
* Base URL: https://the-internet.herokuapp.com 
* Timeout settings: 10 seconds for wait, 60 seconds for tests 
* Auto screenshot on test failure 

To modify browser or add capabilities, update the capabilities array in wdio.conf.js:

	javascript 
	
	capabilities_ [{
		browserName: 'Chrome',  // of 'firefox', 'edge'
		'goog:chromeOptions': {
			args: ['--window-size=1920,1080']
		}
	}]
	
	
	
🚀 Running tests

Run all tests 

	bash
	npm run wdio 
	
	
Run specific test file 

	bash
	npx wdio run wdio.conf.js --spec ./test/specs/login.spec.js 
	
	
	
Run with different browser 

	bash
	npx wdio run wdio.conf.js --capabilities.browserName=firefox 
	
	
📊 Test Data Management

Test data is stored in JSON format under test/data/:


JSON
{
	"validUser": {
		"username": "tomsmith",
		"password": "SuperSecretPassword!"
	},
	"invalidUser": {
		"username": "wronguser",
		"password": "wrongpass"
	},
	"messages": {
		"loginSuccess": "You logged into a secure area",
		"loginFailed": "Your username is invalid"
	}
}

Data is imported using Node.js createRequire for maximum compatibility

JavaScript

	import { createRequire } from 'module';
	const require = createRequire(import.meta.url);
	const testData = require('../data/test-data.json');
	
📈 Reporting

Spec Reporter (Default)

Provides real-time test execution feedback in the console:

* ✅ Green checkmarks for passed tests
* ❌ Red X's for failed tests 
* X Detailed error messages 

Allure Reporter (Optional)

To enable Allure reporting:

1. Uncomment Allure configuration in wdio.conf.js
2. Install Allure commandline: npm install -g allure-commandline 
3. Generate report: npm run report 


🏆 Best Practices Implemented 

1. Page Object Model (POM) 

* Each page has its own class with locators and methods 
* Base page class contains reusabl methods
* Tests only contain business logic, not implementation details 


2. Smart Waits 

javascript 

	// ❌ Avoid
	browser.pause(3000);
	
	// ✅ use 
	await element.waitForClickable({ timeout: 5000 });
	await element.waitForDisplayed({ timeout: 5000 });


3. Separation of Concerns 

* Locators -> Page Objects
* Test Logic -> Spec files
* Test Data -> JSON files
* Utilities -> Helper modules 


4. Robust Selectors 

* Use stable attributes (IDs, data-testId) when possible
* Avoid brittle XPaths
* Prefer CSS selectors for better performance 


5. Automatic ScreenShots on Failure 

JavaScript

	afterTest: async function(test, context, { error }) {
		if (error) {
			await browser.saveScreenshot('./screenshots/${testName}.png');
		}
	}
	
	
🤝Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature')
5. Open a Pull Request 

👨‍💻👨‍ Author 

Franklin Gonzalez Torres 

* GitHub: @Fr4nkl1nZS
* LinkedIn: https://www.linkedin.com/in/franklin-gonzalez-b4823588/