// auth_ui.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("test auth screens", () => {

  it("goes to login page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".clickable").contains("login").click();
    cy.url().should("http://localhost:3000/login");
  });

  it("goes to register page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".clickable").contains("register").click();
    cy.url().should("http://localhost:3000/register");
  });

  it("creates a new user", () => {
    cy.visit("http://localhost:3000/register");
    cy.getbyLabelText("name").type("Cypress").should("have.value", "Cypress");
    cy.getbyLabelText("username").type("CypressUser").should("have.value", "CypressUser");
    cy.getbyLabelText("email").type("Cypress@gmail.com").should("have.value", "Cypress@gmail.com");
    cy.getbyLabelText("password").type("Cypress").should("have.value", "Cypress");
    cy.getbyLabelText("charity").type("Cypress").should("have.value", "Cypress");
    cy.get("Button").contains("Submit");
    cy.url().should("http://localhost:3000/login");
  });

  it("logs into the app", () => {
    cy.visit("http://localhost:3000/login");
    cy.getbyLabelText("username").type("willhark");
    cy.getbyLabelText("password").type("test123");
    cy.get("Button").contains("Submit");
    cy.url().should("http://localhost:3000/");
  });

  // it("submits the username and routes to", () => {
  //   cy.intercept("POST", "/login**", { statusCode: 204 });
  //   cy.visit("http://localhost:3000/login");
  //   cy.get("input").type("john");
  //   cy.get("form").submit();
  //   cy.url().should("eq", "http://localhost:3000/");
  // });


});
