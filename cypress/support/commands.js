// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('https://qa-getdal-1a.getdal.sa/login');
  cy.get('#_r_0_-form-item').type('admin@getdal.com');
  cy.get('#_r_1_-form-item > input').type('WDR*7123412a');
  cy.get('body > div > div > form > button').click();
  cy.url().should('include', 'https://qa-getdal-1a.getdal.sa/'); // adjust to your actual post-login URL
});
