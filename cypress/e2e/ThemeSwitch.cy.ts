describe('ThemeSwitch spec', () => {
  it('should change theme', () => {
    cy.visit('/');
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('input[role="toggle-theme"]').siblings().click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });
});
