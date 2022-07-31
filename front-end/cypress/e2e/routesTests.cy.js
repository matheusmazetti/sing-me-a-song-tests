/// <reference types="cypress" />

describe("testar rotas ao clicar nos botões", () => {
    it("home para top", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("Top").click();

        cy.url().should("equal", "http://localhost:3000/top");
    });
    it("home para random", () => {
        cy.visit("http://localhost:3000/");
        cy.contains("Random").click();

        cy.url().should("equal", "http://localhost:3000/random");
    })
    it("top para random", () => {
        cy.visit("http://localhost:3000/top");
        cy.contains("Random").click();

        cy.url().should("equal", "http://localhost:3000/random");
    })
    it("top para home", () => {
        cy.visit("http://localhost:3000/top");
        cy.contains("Home").click();

        cy.url().should("equal", "http://localhost:3000/");
    })
    it("random para top", () => {
        cy.visit("http://localhost:3000/random");
        cy.contains("Top").click();

        cy.url().should("equal", "http://localhost:3000/top");
    })
    it("random para home", () => {
        cy.visit("http://localhost:3000/random");
        cy.contains("Home").click();

        cy.url().should("equal", "http://localhost:3000/");
    })
})