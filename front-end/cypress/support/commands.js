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

Cypress.Commands.add("resetDatabase", () => {
	cy.intercept({
        method: 'POST',
        url: 'http://localhost:5000/reset-database'
    }).as("reset");
	
    cy.wait("@reset");
});

Cypress.Commands.add("seedDatabase", () => {
    cy.request("POST", "http://localhost:5000/seed",{}).as("seed")
    
    cy.wait("@seed");
})