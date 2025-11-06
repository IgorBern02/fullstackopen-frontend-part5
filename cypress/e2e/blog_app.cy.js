// describe("Blog app", function () {
//   beforeEach(function () {
//     cy.request("POST", "http://localhost:3001/api/testing/reset");
//     const user = {
//       name: "Igor",
//       username: "igu",
//       password: "salainen",
//     };
//     cy.request("POST", "http://localhost:3001/api/users/", user);
//     cy.visit("/");
//   });

// it("Login form is shown", function () {
//   cy.contains("login");
//   cy.get('input[name="Username"]');
//   cy.get('input[name="Password"]');
// });

// describe("Login", function () {
//   it("succeeds with correct credentials", function () {
//     cy.contains("login").click();
//     cy.get("#username").type("igu");
//     cy.get("#password").type("salainen");
//     cy.get("#login-button").click();

//     cy.contains("Igor logged in");
//   });

//   it("fails with wrong credentials", function () {
//     cy.contains("login").click();
//     cy.get("#username").type("igu");
//     cy.get("#password").type("wrong");
//     cy.get("#login-button").click();

//     cy.contains("invalid usernane or password");

//     cy.should("not-contain", "Igor logged in");
//   });
// });

// describe("When logged in", function () {
//   beforeEach(function () {
//     cy.request("POST", "http://localhost:3001/api/testing/reset");
//     const user = {
//       name: "Igor",
//       username: "igu",
//       password: "salainen",
//     };
//     cy.request("POST", "http://localhost:3001/api/users/", user);
//     cy.visit("http://localhost:5173");

//     cy.contains("login").click();
//     cy.get("#username").type("igu");
//     cy.get("#password").type("salainen");
//     cy.get("#login-button").click();

//     cy.contains("Igor logged in");
//   });

//   it("A blog can be created", function () {
//     cy.contains("new blog").click();
//     cy.get("#title").type("blog exemple");
//     cy.get("#author").type("igu");
//     cy.get("#url").type("https://exemple.com");
//     cy.get("#create").click();

//     cy.contains("blog exemple");
//   });
// });

describe("When logged in", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Igor",
      username: "igu",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173");

    cy.contains("login").click();
    cy.get("#username").type("igu");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("Igor logged in");
  });

  it("User who created a blog can delete it", function () {
    // cria um blog
    cy.contains("new blog").click();
    cy.get("#title").type("blog to be deleted");
    cy.get("#author").type("igu");
    cy.get("#url").type("https://delete.com");
    cy.get("#create").click();

    // abre o blog
    cy.contains("view").click();

    // clica em "remove"
    cy.contains("remove").click();

    // confirma que não aparece mais na tela
    cy.should("not.contain", "blog to be deleted");
  });
});
