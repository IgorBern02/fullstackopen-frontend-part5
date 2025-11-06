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
    // Reset banco
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    // Cria dois usuários
    const user1 = {
      name: "User One",
      username: "user1",
      password: "123456",
    };
    const user2 = {
      name: "User Two",
      username: "user2",
      password: "123456",
    };

    cy.request("POST", "http://localhost:3001/api/users/", user1);
    cy.request("POST", "http://localhost:3001/api/users/", user2);

    // Login com user1 e cria um blog
    cy.login({ username: "user1", password: "123456" });
    cy.createBlog({
      title: "Blog de user1",
      author: "Autor A",
      url: "http://example.com",
    });

    cy.logout();
  });

  it("only the creator can see the delete button", function () {
    // login com outro usuário
    cy.login({ username: "user2", password: "123456" });

    // exibe o blog
    cy.contains("Blog de user1")
      .parent()
      .find("button")
      .contains("view")
      .click();

    // garante que o botão de exclusão NÃO existe
    cy.contains("Blog de user1").parent().should("not.contain", "remove");
  });
});
