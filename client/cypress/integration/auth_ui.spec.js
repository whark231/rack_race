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
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("goes to register page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".clickable").contains("register").click();
    cy.url().should("eq", "http://localhost:3000/register");
  });

  it("creates a new user", () => {
    cy.visit("http://localhost:3000/register");
    cy.get("#name").type("Cypress").should("have.value", "Cypress");
    cy.get("#username").type("CypressUser").should("have.value", "CypressUser");
    cy.get("#email").type("Cypress@gmail.com").should("have.value", "Cypress@gmail.com");
    cy.get("#password").type("Cypress").should("have.value", "Cypress");
    cy.get("#charity").type("Cypress").should("have.value", "Cypress");
    cy.get("Button").contains("Submit").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("logs into the app", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("wrong credentials (password)", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("wrong credentials (username)", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("noname").should("have.value", "noname");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("locks the user out", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("willhark").should("have.value", "willhark");
    // 1
    cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    // 2
    // cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    // 3
    // cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    // 5
    // cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    // 5
    // cy.get('#password').type("wrong").should("have.value", "wrong");
    cy.get("Button").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/login");
    // check for lockout
  });

  it("forgot password", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("Button").contains("Forgot Password").click();
    cy.url().should("eq", "http://localhost:3000/forgotpassword");
    cy.get('#email').type("whark@seas.upenn.edu").should("have.value", "whark@seas.upenn.edu");
  });

});

// describe("test auth landing page", () => {
//
//   // test goes here
//
// });
//
// describe("test auth landing page", () => {
//
//   // test goes here
//
// });
//
// describe("test auth landing page", () => {
//
//   // test goes here
//
// });
