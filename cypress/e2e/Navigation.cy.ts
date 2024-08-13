describe('Navigation spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to timeline page', () => {
    cy.get('nav').find('a').contains('Timeline').click();
    cy.url().should('include', '/timeline');
    cy.get('[data-testid=timeline-page]').should('be.visible');
  });

  it('should navigate to banks page', () => {
    cy.get('nav').find('a').contains('Banks map').click();
    cy.url().should('include', '/banksMap');
    cy.get('[data-testid=banks-map-page]').should('be.visible');
  });

  it('should navigate to contacts page', () => {
    cy.get('nav').find('a').contains('Contacts').click();
    cy.url().should('include', '/contact');
    cy.get('[data-testid=contact-page]').should('be.visible');
  });

  it('should open burger menu on mobile and allow page change', () => {
    cy.viewport('iphone-x');
    cy.get('.navbar__burger-menu-button').click();
    cy.get('.navbar').should('be.visible');
    cy.get('.navbar').find('a').contains('Timeline').click();
    cy.url().should('include', '/timeline');
  });
});
