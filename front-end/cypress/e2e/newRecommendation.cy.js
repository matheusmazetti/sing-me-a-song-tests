/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe("testar a função de adicionar uma nova recomendação", () => {
    it("insere informações corretas e faz a requisição", () => {
        let newRec = {
            name: faker.music.songName(),
            url: "https://www.youtube.com/watch?v=Ju8Hr50Ckwk"
        }
        cy.visit("http://localhost:3000/");

        cy.get("#name").type(newRec.name);
        cy.get("#link").type(newRec.url);
        cy.get("#newRecButton").click();
        cy.get("article").should('be.visible');
    });
    it("clica no botão sem informações corretas", () => {
        cy.visit("http://localhost:3000/");
        cy.get("#newRecButton").click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Error creating recommendation!');
        })
    })
})