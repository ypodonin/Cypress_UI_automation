# 🧪 QA Automation Portfolio: Cypress, Selenium & Artillery

![Cypress](https://img.shields.io/badge/Cypress-14.4.0-brightgreen)
![Selenium](https://img.shields.io/badge/Selenium-Python-blue)
![Artillery](https://img.shields.io/badge/Artillery-Performance-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

This repository contains real-world QA automation examples for my portfolio site [qa.ypodonin.space](https://qa.ypodonin.space), including:

- ✅ **Cypress** (UI automation with JavaScript)
- ✅ **Selenium** (UI automation with Python)
- ✅ **Artillery** (Performance/load testing)

These projects demonstrate my growing skills in test automation and modern QA practices.

---

## 📁 Folder Structure

```
qa-automation-learning/
├── cypress-learning/
│   ├── cypress/
│   │   ├── e2e/
│   │   │   ├── basic/
│   │   │   │   └── comprehensive-portfolio-tests.cy.js
│   │   │   └── pom/
│   │   │       └── pom-comprehensive-tests.cy.js
│   │   ├── fixtures/
│   │   │   ├── example.json
│   │   │   ├── profile.json
│   │   │   └── users.json
│   │   ├── reports/
│   │   │   ├── comprehensive-portfolio-report.html
│   │   │   ├── pom-test-suite.html
│   │   │   ├── mochawesome_001.json
│   │   │   ├── mochawesome.json
│   │   │   └── assets/
│   │   ├── support/
│   │   │   ├── commands.js
│   │   │   ├── e2e.js
│   │   │   └── pageObjects/
│   │   │       ├── HomePage.js
│   │   │       ├── Footer.js
│   │   │       └── Navbar.js
│   │   ├── downloads/
│   │   └── screenshots/
│   ├── cypress.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── gitignore
├── selenium-learning/
│   ├── basic_test_portfolio.py
│   └── venv/
├── artillery-learning/
│   ├── test.yml
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
└── README.md
```

> Each project folder is self-contained and includes all necessary configs and reports.

---

## 🧪 Cypress UI Automation

Automated tests for [qa.ypodonin.space](https://qa.ypodonin.space) built with **Cypress**, **Mocha**, and **Chai**.

### ✅ Highlights

- Tests actual live portfolio flows
- Includes assertions for UI elements, routing, and content
- Generates visual HTML test reports (Mochawesome)
- Includes POM-based test suite for scalable structure

### 🔄 Test Approaches

- `basic/comprehensive-portfolio-tests.cy.js`: simple functional tests
- `pom/pom-comprehensive-tests.cy.js`: page-object model implementation

### 🔧 Useful Commands

```bash
npm run test           # Headless test run
npm run test:open      # Open Cypress GUI
npm run test:report    # Merge reports and generate HTML report
```

---

## 🐍 Selenium UI Test (Python)

Basic Selenium test for opening and validating [qa.ypodonin.space](https://qa.ypodonin.space) using **Python**:

- File: selenium-learning/basic_test_portfolio.py
- Virtual environment: selenium-learning/venv/

### To run:

```bash
source venv/bin/activate  # or your OS equivalent
python basic_test_portfolio.py
```

---

## 🚀 Artillery Performance Testing (Training Example)

This folder includes a **training-oriented performance test** configuration written in [Artillery](https://artillery.io/). It’s designed for educational purposes and simulates load/stress/spike tests on a sample API target (`http://httpbin.org/`).

- Config file: `artillery-learning/test.yml`
- Status: Training/test template (not used for production yet)
- Covers:
  - Load testing
  - Optional stress, spike, and scalability test templates
  - Response time thresholds and success conditions
- Includes conditional checks for:
  - max response time
  - failure rate
  - request throughput

> 🚧 You can adapt this template to real APIs by replacing the `target` value and adding custom flows.

### To run:

```bash
cd artillery-learning
npm install
npx artillery run test.yml
```

---

💼 LinkedIn: [linkedin.com/in/ypodonin](https://www.linkedin.com/in/ypodonin/)
🔗 Portfolio: [qa.ypodonin.space](https://qa.ypodonin.space)
💻 GitHub Repo: [github.com/ypodonin/qa-automation-learning](https://github.com/ypodonin/qa-automation-learning)
