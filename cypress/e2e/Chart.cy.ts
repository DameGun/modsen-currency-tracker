describe('Chart spec', () => {
  beforeEach(() => {
    cy.visit('/timeline');
  });

  it('should render chart', () => {
    cy.get('canvas').should('exist').should('be.visible');
  });

  it('should add point', () => {
    cy.getBySel('create-point-form').should('exist').should('be.visible');

    cy.getBySel('create-point-form').within(() => {
      cy.get('#currency-select').click();
      cy.get('input[value=USD]').click();
      cy.get('#date').type('2023-03-01');
      cy.get('#o').type('1');
      cy.get('#h').type('2');
      cy.get('#l').type('0.8');
      cy.get('#c').type('1.5');
      cy.get('button[type=submit]').click();
    });

    cy.getBySel('create-point-form').within(() => {
      cy.get('#currency-select').click();
      cy.get('input[value=USD]').click();
      cy.get('#date').type('2023-03-06');
      cy.get('#o').type('1');
      cy.get('#h').type('2');
      cy.get('#l').type('0.8');
      cy.get('#c').type('1.5');
      cy.get('button[type=submit]').click();
    });

    cy.getBySel('points-list').should('exist').should('have.length', 1);

    cy.wait(1000);

    cy.get('canvas').toMatchImageSnapshot({ name: 'chart' });
  });
});
