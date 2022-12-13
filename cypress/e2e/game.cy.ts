// https://docs.cypress.io/api/introduction/api.html

describe("Load first page", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Réunionïte");
    cy.get("input").type("Toto");
    cy.contains("Valider").click();
    cy.get("input").type("Jacques");
    cy.contains("Valider").click();
    cy.get("input").type("Toto");
    cy.contains("Nom déjà utilisé");
    cy.get("input").clear();
    cy.contains("Ne peut être vide");
    cy.get("input").type("Pirloui");
    cy.contains("Valider").click();
    cy.contains("Commencer la partie").click();
    cy.contains("C’est moi").click();
    cy.contains("Ok").click();
    cy.contains("C’est moi").click();
    cy.contains("Ok").click();
    cy.contains("C’est moi").click();
    cy.contains("C’est parti").click();
    cy.contains("Suivant").click();
    cy.contains("Suivant").click();
    cy.contains("Refaite un tour").click();
    cy.contains("Suivant").click();
    cy.contains("Suivant").click();
    cy.contains("Virer un").click();
    cy.contains("Pirloui").click();
    cy.contains("Bravo");
    cy.contains("Nouvelle réunion").click();
  });
});
