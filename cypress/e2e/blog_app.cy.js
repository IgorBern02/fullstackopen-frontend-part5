describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Igor",
      username: "igu",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get('input[name="Username"]');
    cy.get('input[name="Password"]');
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("igu");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Igor logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("igu");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("invalid usernane or password");

      cy.should("not-contain", "Igor logged in");
    });
  });
});
