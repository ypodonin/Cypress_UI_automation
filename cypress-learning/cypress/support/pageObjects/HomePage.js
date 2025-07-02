class HomePage {
  // Selectors
  getWelcomeMessage() {
    return cy.contains("👋 Welcome to My QA Portfolio");
  }

  getPortfolioCollection() {
    return cy.get(".portfolio-collection");
  }

  getIntroBox() {
    return cy.get(".intro-box");
  }

  getPortfolioGrid() {
    return cy.get(".portfolio-grid");
  }

  getPortfolioCategories() {
    return cy.get(".portfolio-category");
  }

  getPortfolioLink(linkText) {
    return cy.contains(".portfolio-link", linkText);
  }

  getExternalLink(partialHref) {
    return cy.get(`a[href*="${partialHref}"]`);
  }

  getCertificatesSection() {
    return cy.get(".section-box").contains("🎓 Verified Certifications");
  }

  getBugHuntSection() {
    return cy.get(".section-box").contains("🕹️ Visual Bug Hunt");
  }

  getStartBugHuntLink() {
    return cy.get('a[href="/bugged"]').contains("⚠️ Start Bug Hunt");
  }

  getBackToTopButton() {
    return cy.get(".back-to-top");
  }

  // Methods
  visit() {
    cy.visit("https://qa.ypodonin.space");
    cy.get("body").should("be.visible");
  }

  clickPortfolioLink(linkText) {
    this.getPortfolioLink(linkText)
      .scrollIntoView()
      .should("be.visible")
      .click();
  }

  clickStartBugHunt() {
    this.getStartBugHuntLink().click();
  }

  scrollToBottom() {
    cy.scrollTo("bottom");
  }

  clickBackToTop() {
    this.getBackToTopButton().click();
  }

  assertUrlIncludes(path) {
    cy.url().should("include", path);
  }

  assertScrolledToTop() {
    cy.window().its("scrollY").should("eq", 0);
  }
}

export default new HomePage();
