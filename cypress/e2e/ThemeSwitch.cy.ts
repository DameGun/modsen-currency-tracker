describe('ThemeSwitch spec', () => {
  it('should change theme', () => {
    cy.visit('/contact');

    cy.get('html').should('have.attr', 'data-theme', 'dark');

    cy.get('input[role="toggle-theme"]').click({ force: true });

    cy.get('html').should('have.attr', 'data-theme', 'light');

    cy.get('input[role="toggle-theme"]').click({ force: true });

    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
