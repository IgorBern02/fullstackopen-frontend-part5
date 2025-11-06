describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Igor",
      username: "igao",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:5173"); // ou porta do seu front-end
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "igao", password: "12345" });

      cy.createBlog({
        title: "Blog com 5 likes",
        author: "Autor 1",
        url: "url1.com",
        likes: 5,
      });
      cy.createBlog({
        title: "Blog com 10 likes",
        author: "Autor 2",
        url: "url2.com",
        likes: 10,
      });
      cy.createBlog({
        title: "Blog com 3 likes",
        author: "Autor 3",
        url: "url3.com",
        likes: 3,
      });
    });

    it("blogs are ordered by number of likes in descending order", function () {
      cy.get(".blog").eq(0).should("contain", "Blog com 10 likes");
      cy.get(".blog").eq(1).should("contain", "Blog com 5 likes");
      cy.get(".blog").eq(2).should("contain", "Blog com 3 likes");
    });
  });
});
