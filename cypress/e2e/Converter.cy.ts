describe('Converter', () => {
  it('should open convert modal and perform conversion', () => {
    cy.visit('/');

    cy.get('.currency-card').contains(/^USD$/).click();
    cy.getBySel('converter').should('be.visible');

    cy.get('#to-select').should('be.visible').click();
    cy.get('#to-selectBTC').click();
    cy.get('#to-select > button').should('have.text', 'BTC');

    cy.get('#from').type('1528');

    cy.get('#to').should('not.equal', '');
  });
});
