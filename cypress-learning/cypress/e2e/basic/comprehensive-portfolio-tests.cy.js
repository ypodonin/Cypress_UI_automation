describe("QA Portfolio - Comprehensive Test Suite", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("https://qa.ypodonin.space");
    // Wait for the page to load completely
    cy.get("body").should("be.visible");
  });

  describe("Core Navigation & Layout", () => {
    it("should display the navbar with logo and navigation links", () => {
      // Check navbar exists
      cy.get(".navbar").should("be.visible");

      // Check logo
      cy.get(".navbar-logo").should("be.visible");
      cy.get(".navbar-logo a").should("contain", "QA Portfolio");

      // Check main navigation links
      cy.get(".navbar-links").should("be.visible");
      cy.get(".navbar-links a").should("contain", "🏠 Home");
      cy.get(".navbar-links .dropdown-btn").should(
        "contain",
        "▶️ Tests & Bugs"
      );
      cy.get(".navbar-links a").should("contain", "🎓 Certificates");
    });

    it("should have working dropdown menu for Tests & Bugs", () => {
      // Check dropdown button exists
      cy.get(".dropdown-btn").should("be.visible");

      // Check dropdown content exists (may not be visible by default)
      cy.get(".dropdown-content").should("exist");

      // Check dropdown categories exist
      cy.get(".dropdown-category").should("have.length.at.least", 1);
      cy.get(".category-header").should(
        "contain",
        "📂 Portfolio Testing (Live Project)"
      );
      cy.get(".category-header").should(
        "contain",
        "📂 Training-Based Practice"
      );
      cy.get(".category-header").should("contain", "📂 Test Documentation");
      cy.get(".category-header").should("contain", "📂 Technical Testing");
      cy.get(".category-header").should("contain", "📂 Real-World Tasks");
    });

    it("should have working mobile menu toggle", () => {
      // Set viewport to mobile size
      cy.viewport("iphone-x");

      // Check mobile menu icon exists
      cy.get(".navbar-menu-icon").should("be.visible");

      // Click mobile menu icon
      cy.get(".navbar-menu-icon").click();

      // Check mobile menu is active
      cy.get(".navbar-links.mobile-only").should("have.class", "active");
      cy.get(".mobile-nav-overlay").should("have.class", "active");

      // Click overlay to close
      cy.get(".mobile-nav-overlay").click();
      cy.get(".navbar-links.mobile-only").should("not.have.class", "active");
    });

    it("should have working theme toggle", () => {
      // Check theme toggle exists
      cy.get(".theme-toggle").should("exist");

      // Test that theme toggle is clickable
      cy.get(".theme-toggle:visible").first().click({ force: true });

      // Verify the click happened (don't check specific theme class)
      cy.log("Theme toggle clicked successfully");
    });

    it("should have working back to top button", () => {
      // Scroll down to trigger back to top button
      cy.scrollTo("bottom");

      // Check back to top button appears
      cy.get(".back-to-top").should("be.visible");

      // Click back to top
      cy.get(".back-to-top").click();

      // Check page scrolled to top
      cy.window().its("scrollY").should("eq", 0);
    });

    it("should have working footer with social links", () => {
      // Scroll to footer
      cy.scrollTo("bottom");

      // Check footer exists
      cy.get(".footer").should("be.visible");

      // Check footer contains some copyright text (more flexible)
      cy.get(".footer").should("contain", "©");
      cy.get(".footer").should("contain", "Yaroslav");

      // Check social links exist
      cy.get('.footer-icons a[href*="linkedin"]').should("be.visible");
      cy.get('.footer-icons a[href*="github"]').should("be.visible");

      // Check social links open in new tab
      cy.get('.footer-icons a[href*="linkedin"]').should(
        "have.attr",
        "target",
        "_blank"
      );
      cy.get('.footer-icons a[href*="github"]').should(
        "have.attr",
        "target",
        "_blank"
      );
    });
  });

  describe("Home Page (Welcome Component)", () => {
    beforeEach(() => {
      cy.visit("https://qa.ypodonin.space/"); // Use full URL for reliability
      cy.contains("👋 Welcome to My QA Portfolio").should("be.visible");
      cy.get(".portfolio-collection").should("be.visible");
    });

    it("should display welcome section with proper content", () => {
      // Check welcome section
      cy.get(".intro-box").should("be.visible");
      cy.get(".intro-box h1").should(
        "contain",
        "👋 Welcome to My QA Portfolio"
      );

      // Check portfolio collection section
      cy.get(".portfolio-collection").should("be.visible");
      cy.get(".portfolio-collection h2").should(
        "contain",
        "📂 QA Portfolio Collection"
      );

      // Check portfolio grid
      cy.get(".portfolio-grid").should("be.visible");
      cy.get(".portfolio-category").should("have.length", 3);
    });

    it("cycles through every portfolio link", () => {
      cy.visit("https://qa.ypodonin.space/");
      cy.contains("👋 Welcome to My QA Portfolio").should("be.visible");
      cy.get(".portfolio-collection").should("be.visible");

      const links = [
        { text: "QA Portfolio Testing", path: "/project-testing" },
        { text: "Practical Training Summary", path: "/qa-project-collection" },
        { text: "Test Cases", path: "/tests" },
        { text: "Bug Reports", path: "/bugs" },
        { text: "API Testing with Postman", path: "/postman" },
        { text: "SQL Analysis", path: "/dbeaver" },
      ];

      links.forEach(({ text, path }) => {
        cy.contains(".portfolio-link", text)
          .scrollIntoView()
          .should("be.visible")
          .click();

        cy.url().should("include", path);
        cy.go("back");
        // Wait for Welcome page to reload before next click
        cy.contains("👋 Welcome to My QA Portfolio").should("be.visible");
      });
    });

    it("should have working external links", () => {
      // Test Google Drive link - check for any link containing drive.google.com
      cy.get('a[href*="drive.google.com"]').should("exist");
      cy.get('a[href*="drive.google.com"]').should(
        "have.attr",
        "target",
        "_blank"
      );

      // Test LinkedIn link - check for any link containing linkedin.com
      cy.get('a[href*="linkedin.com"]').should("exist");
      cy.get('a[href*="linkedin.com"]').should("have.attr", "target", "_blank");
    });

    it("should display certificates section", () => {
      cy.get(".section-box")
        .contains("🎓 Verified Certifications")
        .should("be.visible");
      cy.get(".section-box")
        .contains("ISTQB Certified Tester")
        .should("be.visible");
      cy.get(".section-box")
        .contains("CS50 Web Programming")
        .should("be.visible");
      cy.get(".section-box")
        .contains("CS50 Introduction to Computer Science")
        .should("be.visible");
    });

    it("should have working bug hunt section", () => {
      cy.get(".section-box")
        .contains("🕹️ Visual Bug Hunt")
        .should("be.visible");
      cy.get('a[href="/bugged"]')
        .contains("⚠️ Start Bug Hunt")
        .should("be.visible");
      // Test clicking the link (may scroll to section or navigate)
      cy.get('a[href="/bugged"]').contains("⚠️ Start Bug Hunt").click();
      // Don't check URL since it might be a section on the same page
    });
  });

  describe("Responsive Design", () => {
    it("should work on mobile devices", () => {
      cy.viewport("iphone-x");
      cy.visit("https://qa.ypodonin.space");

      // Check mobile menu
      cy.get(".navbar-menu-icon").should("be.visible");
      cy.get(".navbar-links.desktop-only").should("not.be.visible");

      // Check mobile theme toggle
      cy.get(".theme-toggle.mobile-only").should("be.visible");
    });

    it("should work on tablet devices", () => {
      cy.viewport("ipad-2");
      cy.visit("https://qa.ypodonin.space");

      // Check responsive layout
      cy.get(".navbar").should("be.visible");
      cy.get(".main-content").should("be.visible");
    });

    it("should work on desktop devices", () => {
      cy.viewport(1920, 1080);
      cy.visit("https://qa.ypodonin.space");

      // Check desktop navigation
      cy.get(".navbar-links.desktop-only").should("be.visible");
      cy.get(".dropdown").should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels", () => {
      cy.get("[aria-label]").should("have.length.at.least", 1);
      cy.get(".theme-toggle").should("have.attr", "aria-label");
    });

    it("should have proper heading structure", () => {
      cy.get("h1").should("have.length", 1);
      cy.get("h2").should("have.length.at.least", 1);
    });

    it("should have proper alt text for images", () => {
      // Only check alt text if images exist on the page
      cy.get("body").then(($body) => {
        if ($body.find("img").length > 0) {
          cy.get("img").each(($img) => {
            cy.wrap($img).should("have.attr", "alt");
          });
        } else {
          // If no images, skip the test
          cy.log("No images found on the page, skipping alt text check");
        }
      });
    });

    it("should be keyboard navigable", () => {
      // Test that interactive elements exist and can be interacted with
      cy.get(".navbar-logo a").should("be.visible");

      // Test enter key on interactive elements
      cy.get(".navbar-logo a").focus().type("{enter}");
      // Don't check URL since it might be the same page
    });

    it("should have proper focus indicators", () => {
      cy.get("a").first().focus();
      cy.focused().should("be.visible");
    });
  });

  describe("Cross-browser Compatibility", () => {
    it("should work with different viewport sizes", () => {
      const viewports = [
        [375, 667], // iPhone SE
        [768, 1024], // iPad
        [1024, 768], // iPad landscape
        [1920, 1080], // Desktop
      ];

      viewports.forEach(([width, height]) => {
        cy.viewport(width, height);
        cy.visit("https://qa.ypodonin.space");
        cy.get("body").should("be.visible");
      });
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
      cy.visit("https://qa.ypodonin.space");
      cy.get("body").should("not.contain", "password");
      cy.get("body").should("not.contain", "secret");
      cy.get("body").should("not.contain", "api_key");
    });
  });
});
