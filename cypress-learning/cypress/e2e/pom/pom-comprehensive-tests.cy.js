import Navbar from "../../support/pageObjects/Navbar";
import HomePage from "../../support/pageObjects/HomePage";
import Footer from "../../support/pageObjects/Footer";

describe("QA Portfolio - POM Test Suite", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  describe("Core Navigation & Layout", () => {
    it("should display the navbar with logo and navigation links", () => {
      Navbar.getNavbar().should("be.visible");
      Navbar.getLogo().should("be.visible");
      Navbar.getLogoLink().should("contain", "QA Portfolio");
      Navbar.getNavbarLinks().should("be.visible");
      Navbar.getHomeLink().should("be.visible");
      Navbar.getTestsAndBugsDropdown().should("contain", "▶️ Tests & Bugs");
      Navbar.getCertificatesLink().should("be.visible");
    });

    it("should have working dropdown menu for Tests & Bugs", () => {
      Navbar.getTestsAndBugsDropdown().should("be.visible");
      Navbar.getDropdownContent().should("exist");
      Navbar.getDropdownCategories().should("have.length.at.least", 1);
      Navbar.getDropdownContent().should(
        "contain",
        "📂 Portfolio Testing (Live Project)"
      );
    });

    it("should have working mobile menu toggle", () => {
      cy.viewport("iphone-x");
      Navbar.getMobileMenuIcon().should("be.visible");
      Navbar.clickMobileMenu();
      Navbar.getNavbarLinks().should("have.class", "active");
      Navbar.getMobileNavOverlay().should("be.visible");
      Navbar.clickMobileNavOverlay();
      Navbar.getNavbarLinks().should("not.have.class", "active");
    });

    it("should have working theme toggle", () => {
      Navbar.getThemeToggle().should("exist");
      Navbar.clickThemeToggle();
      cy.log("Theme toggle clicked successfully");
    });

    it("should have working back to top button", () => {
      HomePage.scrollToBottom();
      HomePage.getBackToTopButton().should("be.visible");
      HomePage.clickBackToTop();
      HomePage.assertScrolledToTop();
    });

    it("should have working footer with social links", () => {
      Footer.scrollTo();
      Footer.getFooter().should("be.visible");
      Footer.getCopyrightText().should("be.visible");
      Footer.getAuthorText().should("be.visible");
      Footer.getSocialLink("linkedin").should("be.visible");
      Footer.getSocialLink("github").should("be.visible");
      Footer.assertSocialLinkOpensInNewTab("linkedin");
      Footer.assertSocialLinkOpensInNewTab("github");
    });
  });

  describe("Home Page (Welcome Component)", () => {
    it("should display welcome section with proper content", () => {
      HomePage.getIntroBox().should("be.visible");
      HomePage.getWelcomeMessage().should("be.visible");
      HomePage.getPortfolioCollection().should("be.visible");
      HomePage.getPortfolioCollection()
        .find("h2")
        .should("contain", "📂 QA Portfolio Collection");
      HomePage.getPortfolioGrid().should("be.visible");
      HomePage.getPortfolioCategories().should("have.length", 3);
    });

    it("cycles through every portfolio link", () => {
      const links = [
        { text: "QA Portfolio Testing", path: "/project-testing" },
        { text: "Practical Training Summary", path: "/qa-project-collection" },
        { text: "Test Cases", path: "/tests" },
        { text: "Bug Reports", path: "/bugs" },
        { text: "API Testing with Postman", path: "/postman" },
        { text: "SQL Analysis", path: "/dbeaver" },
      ];

      links.forEach(({ text, path }) => {
        HomePage.clickPortfolioLink(text);
        HomePage.assertUrlIncludes(path);
        cy.go("back");
        HomePage.getWelcomeMessage().should("be.visible");
      });
    });

    it("should have working external links", () => {
      HomePage.getExternalLink("drive.google.com").should("exist");
      HomePage.getExternalLink("drive.google.com").should(
        "have.attr",
        "target",
        "_blank"
      );
      HomePage.getExternalLink("linkedin.com").should("exist");
      HomePage.getExternalLink("linkedin.com").should(
        "have.attr",
        "target",
        "_blank"
      );
    });

    it("should display certificates section", () => {
      HomePage.getCertificatesSection().should("be.visible");
      cy.contains("ISTQB Certified Tester").should("be.visible");
      cy.contains("CS50 Web Programming").should("be.visible");
      cy.contains("CS50 Introduction to Computer Science").should("be.visible");
    });

    it("should have working bug hunt section", () => {
      HomePage.getBugHuntSection().should("be.visible");
      HomePage.getStartBugHuntLink().should("be.visible");
      HomePage.clickStartBugHunt();
    });
  });

  describe("Responsive Design", () => {
    it("should work on mobile devices", () => {
      cy.viewport("iphone-x");
      HomePage.visit();
      Navbar.getMobileMenuIcon().should("be.visible");
      cy.get(".navbar-links.desktop-only").should("not.be.visible");
      Navbar.getThemeToggle().filter(".mobile-only").should("be.visible");
    });

    it("should work on tablet devices", () => {
      cy.viewport("ipad-2");
      HomePage.visit();
      Navbar.getNavbar().should("be.visible");
      cy.get(".main-content").should("be.visible");
    });

    it("should work on desktop devices", () => {
      cy.viewport(1920, 1080);
      HomePage.visit();
      cy.get(".navbar-links.desktop-only").should("be.visible");
      cy.get(".dropdown").should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      cy.get("[aria-label]").should("have.length.at.least", 1);
      Navbar.getThemeToggle().should("have.attr", "aria-label");
    });

    it("should have proper heading structure", () => {
      cy.get("h1").should("have.length", 1);
      cy.get("h2").should("have.length.at.least", 1);
    });

    it("should have proper alt text for images", () => {
      cy.get("body").then(($body) => {
        if ($body.find("img").length > 0) {
          cy.get("img").each(($img) => {
            cy.wrap($img).should("have.attr", "alt");
          });
        } else {
          cy.log("No images found on the page, skipping alt text check");
        }
      });
    });

    it("should be keyboard navigable", () => {
      Navbar.getLogoLink().should("be.visible");
      Navbar.getLogoLink().focus().type("{enter}");
    });

    it("should have proper focus indicators", () => {
      cy.get("a").first().focus();
      cy.focused().should("be.visible");
    });
  });

  describe("Data Validation", () => {
    it("should validate JSON data structure", () => {
      cy.request("/data/test_cases_for_Tests.json").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("tasks");
        expect(response.body).to.have.property("testCases");
        expect(response.body).to.have.property("checks");
      });
    });

    it("should validate Postman data", () => {
      cy.request("/data/postman_tasks.json").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("tasks");
        expect(response.body.tasks).to.be.an("array");
      });
    });

    it("should validate DBeaver data", () => {
      cy.request("/data/dbeaver_tasks.json").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("title");
        expect(response.body).to.have.property("tasks");
        expect(response.body.tasks).to.be.an("array");
      });
    });
  });

  describe("Security", () => {
    it("should have secure external links", () => {
      cy.get('a[target="_blank"]').each(($link) => {
        cy.wrap($link).should("have.attr", "rel", "noopener noreferrer");
      });
    });

    it("should not expose sensitive information", () => {
      cy.get("body").should("not.contain", "password");
      cy.get("body").should("not.contain", "secret");
      cy.get("body").should("not.contain", "api_key");
    });
  });
});
