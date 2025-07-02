class Footer {
  // Selectors
  getFooter() {
    return cy.get(".footer");
  }

  getCopyrightText() {
    return this.getFooter().contains("©");
  }

  getAuthorText() {
    return this.getFooter().contains("Yaroslav");
  }

  getSocialLink(partialHref) {
    return cy.get(`.footer-icons a[href*="${partialHref}"]`);
  }

  // Methods
  scrollTo() {
    this.getFooter().scrollIntoView();
  }

  assertSocialLinkOpensInNewTab(partialHref) {
    this.getSocialLink(partialHref).should("have.attr", "target", "_blank");
  }
}

export default new Footer();
