const mocks = {
  user: {
    firstName: "Jane",
    lastName: "Doe",
    email: "you@email.com",
    gitHubUsername: "username",
    bio: "Describe yourself..."
  }
}

describe('Visit local host', () => {
  it('visits local host', () => {
    cy.visit('localhost:3000/');
  });
});


describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('should have a navbar with login and register buttons, discussion board and news links', function () {
    cy.get("nav").contains("Log in");
    cy.get("nav").contains("Register");
    cy.get("nav").contains("Discussion board");
    cy.get("nav").contains("News");
  });
  it('should have a news feed where it is possible to click on news article link', function () {
    cy.wait(2000)
    cy.get("#url-link").contains("Check out the full story here.").click().url().should('not.include', 'localhost');
  });
  it('should open news feed when news is clicked on navbar', function () {
    cy.get("nav").contains("News").click();
    cy.get("h2").should('not.exist');
  });
  it('should go to home when logo is clicked', function () {
    cy.get("nav").contains("CodeLink").click();
    cy.get("h2").contains("Welcome to CodeLink!");
  })
});

describe('Register', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
    cy.get('nav').contains("Register").click();
  });
  it('should be able to take text input into all fields and submit form, redirecting to profile', function () {
    cy.url().should('include', '/create-profile');
    cy.get("#first-name").type(mocks.user.firstName);
    cy.get("#last-name").type(mocks.user.lastName);
    cy.get("#email").type(mocks.user.email);
    cy.get("#github").type(mocks.user.gitHubUsername);
    cy.get("#bio").type(mocks.user.bio);
    cy.get("form").submit();
    cy.contains("Add to portfolio");
    cy.url().should('include', '/profile');
  });
});

describe('Profile', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/profile');
  });
  it('profile should display user information', function () {
    cy.contains("Email");
    cy.contains("GitHub Username");
    cy.contains("Bio");
    cy.contains("Skills");
  });
  it('should go to github when username is clicked', function () {
    cy.get("#github-link").click();
    cy.wait(2000);
    cy.url().should("not.include", "localhost");
  });
  it('should give option to add a portfolio and the portfolio should be added to my portfolio', function () {
    cy.contains("Add to portfolio").click();
    cy.get('#portfolio-form').should('exist');
    cy.get('#repo-name').contains('GetEasy');
    cy.get('#add-button').click();
    cy.contains("Save").click();
    cy.contains("My portfolio").click();
    cy.contains('GetEasy');
  });
  it('should allow users to see their projects via their portfolios on GitHub', function () {
    cy.contains("My portfolio").click();
    cy.contains('GetEasy');
    cy.get("a").click().should('not.include', 'localhost');
  })
  it('should allow users to delete from their portfolios', function () {
    cy.contains("My portfolio").click();
    cy.contains("GetEasy");
    cy.get("#delete-button").click();
    cy.get("#portfolio-div").should("not.contain", "GetEasy");
  })
  it.only('should give user option to add a skill which is displayed under profile', function () {
  })
  it('should allow users to delete skills on profile', function () {
  })
  it('should allow user to edit profile and show these changes immediately', function () {

  })
  it('should go to email when email is clicked', function () {
    cy.get("#email-link").should('have.attr', 'href').should('match', /^mailto:/);
  });
});