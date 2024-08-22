/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    clickIngredient(ingredientAlias: string): Chainable<Element>;
    modalIsOpen(ingredientAlias: string, text: string): Chainable<Element>;
    createOrder(): Chainable<Element>;
  }
}

Cypress.Commands.add('clickIngredient', (ingredientAlias: string) => {
  cy.get(ingredientAlias)
    .first()
    .within(() => {
      cy.get('button').click();
    });
});

Cypress.Commands.add('modalIsOpen', (ingredientAlias: string, text: string) => {
  cy.get(ingredientAlias).should('be.visible').contains(text);
});

Cypress.Commands.add('createOrder', () => {
  cy.clickIngredient('@bun');
  cy.clickIngredient('@main');
  cy.get('@constructor').within(() => {
    cy.contains('Оформить заказ').click();
  });
});
