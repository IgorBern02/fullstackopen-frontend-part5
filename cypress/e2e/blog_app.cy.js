describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("login");
    cy.get('input[name="Username"]');
    cy.get('input[name="Password"]');
  });
});
