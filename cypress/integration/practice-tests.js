// beforeEach(() => {
//   cy.task("resetDb");
// });

// describe("run test", () => {
//   it("can run test", () => {
//     assert.equal(1, 1);
//   });
// });

// describe("check homepage link", () => {
//   it("can load homepage", () => {
//     cy.visit("/");
//   });
// });

// describe("check navigation links ", () => {
//   it("can navigate to sign up page", () => {
//     cy.visit("/");
//     cy.contains("Sign up").click();
//   });
// });

// describe("check navigation links ", () => {
//   it("can navigate to page after sign up", () => {
//     cy.visit("/");
//     cy.contains("Sign up").click();
//     cy.get("input[name='email']").type("test@gmail.com");
//     cy.get("input[name='name']").type("myname");
//     cy.get("input[name='password']").type("12f");
//     cy.get("button[type='submit']").click();
//     cy.url().should("include", "/");
//   });
// });

// describe("check navigation links ", () => {
//   it("can navigate to log in page", () => {
//     cy.visit("/");
//     cy.contains("Log in").click();
//   });
// });
