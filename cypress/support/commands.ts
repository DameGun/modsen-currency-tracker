/// <reference types="cypress" />
import 'cypress-plugin-snapshots/commands';

Cypress.Commands.add('getBySel', (selector: string, ...args) => {
  return cy.get(`[data-testid="${selector}"]`, ...args);
});
