markdown

# WebDriverIO POM Testing Framework 🚀

![WebDriverIO](https://img.shields.io/badge/tested%20with-WebDriverIO-8.0.0-orange)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow)
![Mocha](https://img.shields.io/badge/test%20runner-Mocha-brightgreen)
![Chai](https://img.shields.io/badge/assertions-Chai-red)

A robust and scalable test automation framework built with WebDriverIO (v8+), implementing the **Page Object 
Model (POM)** design pattern. This framework is designed for end-to-end testing of web applications, with a 
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
-[CI/CD Integration](#cicd-integration)
-[Docker Support](#docker-support)
-[Troubleshooting](#troubleshooting)
-[Best Practices Implementing](#best-practices-implementing)
-[Contribuiting](#contribuiting)
-[Author](#author)

## 🔅 Features

- ✅ **Page Object Model (POM)** - Clean separation between test logic and page-specific code
- ✅ **Automatic waits** - Smart waiting strategies to eliminate flaky tests
- ✅ **Data-Driven Testing** - External JSON test data files
- ✅ **Parallel Execution** - Configured for running tests in parallel 
- ✅ **Screenshot on Failure** - Automatic screenshots for failed tests
- ✅ **Cross-Browser Testing** - Easy configuration for multiple browsers
- ✅ **ES6+ JavaScript** - Modern JavaScript with async/await
- ✅ **Comprehensive Reporting** - Spec reporter with optional Allure integration

## 🛠️ Tech Stack
- **Test Framework:** WebDriverIo (v8+)
- **Test Runner:** Mocha
- **Assertions:** Chai
- **Design Pattern:** Page Object Models (POM)
- **Language:** JavaScript (ES6+)
- **Browser Automation:** ChromeDriver (auto-managed)

## 📁 Project Structure

 webdriverio-pom-framework/
├── test/
│ ├── specs/ # Test files
│ │ └── login.spec.js
│ ├── pageobjects/ # Page Objects
│ │ ├── login.page.js
│ │ └── home.page.js
│ └── data/ # Test data
├── wdio.conf.js # Main config
├── package.json # Dependencies
└── README.md # This file
 
 ## 📋 Prerequisites
 
 - **Node.js** (v16 or higher recommended)
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
	

🔁 CI/CD Integration

GitHub Actions Example

Create .githun/worflows/webdriverio.yml :

yaml

name: WebDriverIO tests

on:
	push:
		branches: [ main, develop ]
	pull_request:
		branches: [ main ]
	schedule:
	 - cron: '0 9 * * *' # Run daily at 9 AM

	 jobs:
	 	test:
			runs-on: ubuntu-latest

			strategy:
				matrix:
					browser: [chrome, firefox, edge]

			steps:
			- name: Checkout code
			  uses: actions/checkout@v3

			- name: Setup Node.js
			  uses: actions/setup-node@v3
			  with:
			  	node-version: '18'
				cache: 'npm'

			- name: Install dependencies
			  run: npm ci

			- name: Run WebDriverIO tests
			  run: npm run test -- --browser ${{ matrix.browser }}
			  continue-on-error: false

			- name: Upload Allure results
			  if: always()
			  uses: actions/upload-artifact@v3
			  with:
			    name: allure-results-${{ matrix.browser }}
				path: allure-results/

			- name: Deploy Allure report to GitHub Pages
			  if: github.ref == 'refs/heads/main'
			  uses: peaceiris/actions-gh-pages@v3
			  with:
			    github_token: ${{ secrets.GITHUB_TOKEN }}
				publish_dir: ./allure-report
				destination_dir: ${{ matrix.browser }}

Jenkins Pipeline Example

groovy

pipeline {
	agent any

	tools {
		nodejs 'NodeJS-18'
	}

	parameters {
		choice (
			name: 'BROWSER'
			choices: ['chrome', 'firefox', 'edge'],
			description: 'Browser to run tests on'
		)
	}

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}

		stage(Install Dependencies') {
			steps {
				sh 'npm ci'
			}
		}

		stage('Run Tests') {
			steps {
				sh "npm run test -- --browser ${params.BROWSER}"
			}
			post {
				always {
					allure([
						includeProperties: false,
						jdk: '',
						properties: [],
						reportBuildPolicy: 'ALWAYS',
						results: [[path: 'allure-results']]
					])
				}
			}
		}
	}

	post {
		always {
			cleanWs()
		}
	}
}

🐳 Docker Support

dockerfile

FROM node:18-slim

# Install Chrome
RUN apt-get update && apt-get install -y \
	wget \
	gnupg \
	&& wget -q -o - https://dl-ssl.google.com/linux_signing_key.pub | apt-key a dd - \
	&& echo "deb [arch=amd64] https://dl.googgle.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
	&& apt-get update && apt-get install -y google-chrome-stable \
	&& rm -rf /var/lib/apt/lists/*

# Install Firefox
RUN apt-get install -y firefox-esr

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
CMD ["npm", "run", "test"]


Docker commands

bash

# Build Docker image
docker build -t webdriverio-tests .

# Run tests in container
docker run --rm -v $(pwd)/allure-results:/app/allure-results webdriverio-tests

# Run tests with specific browser
docker run --rm webdriverio-tests npm run test -- --browser firefox

# Run tests in headless mode
docker run --rm -e HEADLESS=true webdriverio-tests

🔍 Troubleshooting

Common Issues

Issue: "chromedriver" not found

bash

# Update chromedriver
npm run chromedriver-update

# Or reinstall
npm install chromedriver --save-dev

Issue: Tests failing in headless mode

bash

# Add these args to wdio.conf.js
'goog:chromeOptions': {
	args: ['--headless', --no-sandbox', '--disable-dev-shm-usage']
}

Issue: Allure report not generating

bash

# Ensure Java is installed
java -version

# Clear and regenerate
rm -rf allure-results allure.report
npm run test
npm run allure:generate
	
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