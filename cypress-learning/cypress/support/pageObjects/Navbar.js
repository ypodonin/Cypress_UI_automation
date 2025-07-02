class Navbar {
  // Selectors
  getNavbar() {
    return cy.get(".navbar");
  }

  getLogo() {
    return cy.get(".navbar-logo");
  }

  getLogoLink() {
    return cy.get(".navbar-logo a");
  }

  getNavbarLinks() {
    return cy.get(".navbar-links");
  }

  getHomeLink() {
    return this.getNavbarLinks().contains("a", "🏠 Home");
  }

  getTestsAndBugsDropdown() {
    return this.getNavbarLinks().find(".dropdown-btn");
  }

  getCertificatesLink() {
    return this.getNavbarLinks().contains("a", "🎓 Certificates");
  }

  getDropdownContent() {
    return cy.get(".dropdown-content");
  }

  getDropdownCategories() {
    return cy.get(".dropdown-category");
  }

  getMobileMenuIcon() {
    return cy.get(".navbar-menu-icon");
  }

  getMobileNavOverlay() {
    return cy.get(".mobile-nav-overlay");
  }

  getThemeToggle() {
    return cy.get(".theme-toggle");
  }

  // Methods
  clickMobileMenu() {
    this.getMobileMenuIcon().click();
  }

  clickMobileNavOverlay() {
    this.getMobileNavOverlay().click();
  }

  clickThemeToggle() {
    this.getThemeToggle().filter(":visible").first().click({ force: true });
  }

  assertMobileMenuIsActive() {
    this.getNavbarLinks().should("have.class", "active");
    this.getMobileNavOverlay().should("have.class", "active");
  }

  assertMobileMenuIsNotActive() {
    this.getNavbarLinks().should("not.have.class", "active");
  }
}

export default new Navbar();
