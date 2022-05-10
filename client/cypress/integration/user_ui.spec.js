// user_ui.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("testing routing to different pages from landing page", () => {

  it("route to profile", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    // cy.url().should("eq", "http://localhost:3000/users/62795430bb61eb9ec76a2ee3");
    cy.url().should('contain', 'http://localhost:3000/users');
  });

  it("route to settings", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#settings").click();
    // cy.url().should("eq", "http://localhost:3000/users/62795430bb61eb9ec76a2ee3");
    cy.url().should('eq', 'http://localhost:3000/settings');
  });

  it("logout", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#logout").click();
    // cy.url().should("eq", "http://localhost:3000/users/62795430bb61eb9ec76a2ee3");
    cy.url().should('eq', 'http://localhost:3000/');
  });

});

describe("testing routing to different pages from settings page", () => {

  it("route to edit user info", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#settings").click();
    cy.get("#edit_user_info").click();
    cy.url().should('contain', 'http://localhost:3000/users');
    cy.url().should('contain', '/edit');
  });

  it("route to edit user info 2", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#settings").click();
    cy.get("#edit_payment_info").click();
    cy.url().should('eq', 'http://localhost:3000/settings/wallet');
  });

  // it("deletes an account", () => {
  //   cy.visit("http://localhost:3000/login");
  //   cy.get('#username').type("username").should("have.value", "username");
  //   cy.get('#password').type("password").should("have.value", "password");
  //   cy.get("Button").contains("Login").click();
  //   cy.get("#avatar").click();
  //   cy.get("#settings").click();
  //   // cy.get("#delete_account").click();
  //   // cy.url().should('eq', 'http://localhost:3000/');
  //
  //   // reset Account
  //   cy.visit("http://localhost:3000/register");
  //   cy.get("#name").type("name");
  //   cy.get("#username").type("username");
  //   cy.get("#email").type("whark@seas.upenn.edu");
  //   cy.get("#password").type("password");
  //   cy.get("#charity").type("charity");
  //   cy.get("Button").contains("Submit").click();
  // });

});

describe("testing routing to different pages from profile page", () => {

  it("route to settings", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#settings").click();
    cy.url().should('eq', 'http://localhost:3000/settings');
  });

  it("route to new monthly pledge", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#pledge").click();
    cy.url().should('contain', 'http://localhost:3000/users');
    cy.url().should('contain', 'monthlypledges/new');
  });

  it("route to monthly pledge page", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#show").click();
    cy.url().should('contain', 'http://localhost:3000/monthlypledges');
  });



  it("route through new monthly pledge", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#pledge").click();
    cy.url().should('contain', 'http://localhost:3000/users');
    cy.url().should('contain', 'monthlypledges/new');
    cy.get("#submit").click()
    cy.url().should("contain", "localhost:3000/users")
  });

  it("route to monthly pledge page and new work out plan", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#show").click();
    cy.url().should('contain', 'http://localhost:3000/monthlypledges');
    cy.get("#new").click();
    cy.url().should("contain", "http://localhost:3000/monthlypledges/");
    cy.url().should("contain", "workoutplans/new");
    cy.get("#target_days").type("1").should("have.value", "01");
    cy.get("#curr_days_met").type("1").should("have.value", "01");
    cy.get("#weekly_plan").type("1").should("have.value", "1");
  });

  it("route to monthly pledge page and look at work out plan", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('#username').type("username").should("have.value", "username");
    cy.get('#password').type("password").should("have.value", "password");
    cy.get("Button").contains("Login").click();
    cy.get("#avatar").click();
    cy.get("#profile").click();
    cy.get("#show").click();
    cy.url().should('contain', 'http://localhost:3000/monthlypledges');
    cy.get("#show").click();
    cy.url().should("contain", "http://localhost:3000/workoutplans/");

  });
});


describe("editing and deleting items", () => {

    it("delete monthly pledge", () => {
      cy.visit("http://localhost:3000/login");
      cy.get('#username').type("username").should("have.value", "username");
      cy.get('#password').type("password").should("have.value", "password");
      cy.get("Button").contains("Login").click();
      cy.get("#avatar").click();
      cy.get("#profile").click();
      cy.get("#pledge").click();
      cy.url().should('contain', 'http://localhost:3000/users');
      cy.url().should('contain', 'monthlypledges/new');
      cy.get("#submit").click()
      cy.url().should("contain", "localhost:3000/users")
    });
  
  
    it("edit monthly pledge", () => {
      cy.visit("http://localhost:3000/login");
      cy.get('#username').type("username").should("have.value", "username");
      cy.get('#password').type("password").should("have.value", "password");
      cy.get("Button").contains("Login").click();
      cy.get("#avatar").click();
      cy.get("#profile").click();
      cy.get("#show").click();
      cy.url().should('contain', 'http://localhost:3000/monthlypledges');
      cy.get("#new").click();
      cy.url().should("contain", "http://localhost:3000/monthlypledges/");
      cy.url().should("contain", "workoutplans/new");
      cy.get("#target_days").type("1").should("have.value", "01");
      cy.get("#curr_days_met").type("1").should("have.value", "01");
      cy.get("#weekly_plan").type("1").should("have.value", "1");
    });
  
  
    it("edit payment info", () => {
      cy.visit("http://localhost:3000/login");
      cy.get('#username').type("username").should("have.value", "username");
      cy.get('#password').type("password").should("have.value", "password");
      cy.get("Button").contains("Login").click();
      cy.get("#avatar").click();
      cy.get("#profile").click();
      cy.get("#show").click();
      cy.url().should('contain', 'http://localhost:3000/monthlypledges');z
      cy.get("#show").click();
      cy.url().should("contain", "http://localhost:3000/workoutplans/");
  
      cy.get("#settings").click();
      cy.get("#edit_payment_info").click();
      cy.get("#new_pay").click();
      cy.get("#number").type("1");
      cy.get("#name").type("name");
      cy.get("#expiration_date").type("124214");
      cy.get("#cvv").type("11");
      cy.get("#avatar").click();
      cy.get("#settings").click();
      cy.get("#edit_payment_info").click();
      cy.get("#edit").click();
      cy.get("#number").type("1");
      cy.get("#name").type("name");
      cy.get("#expiration_date");
      cy.get("#cvv").type("11");
      cy.url().should('contain', 'http://localhost:3000/paymentmethods');
      cy.url().should('contain', 'edit');
    })
});
