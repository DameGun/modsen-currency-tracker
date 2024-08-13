describe('ThemeSwitch spec', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should have the correct initial theme', () => {
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('should change theme when the button is clicked', () => {
    cy.get('html').should('have.attr', 'data-theme', 'light');

    cy.get('.theme-switch').click();
    cy.wait(2000);

    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
