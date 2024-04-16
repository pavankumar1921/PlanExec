describe("PlanExec Integration tests", () => {
  const appUrl = "http://localhost:3000";
  let token;

  before(() => {
    cy.request("POST", `${appUrl}/signup`, {
      name: "Test User",
      email: "test@gmail.com",
      password: "password123"
    }).then(response => {
      token = response.body.token;
    });
  });

  beforeEach(() => {
    cy.request("POST", `${appUrl}/signin`, {
      email: "test@gmail.com",
      password: "password123"
    }).then(response => {
      token = response.body.token;
    });
  });
  
  it("test for user signup", () => {
    cy.request("POST", `${appUrl}/signup`, {
      name: "New User",
      email: "newuser@gmail.com",
      password: "newpassword123"
    })
    .its("status")
    .should("eq", 200);
  });

  it("test for user signin", () => {
    cy.request("POST", `${appUrl}/signin`, {
      email: "test@gmail.com",
      password: "password123"
    })
    .its("status")
    .should("eq", 200);
  });

  it("test for fetching all events", () => {
    cy.request({
      method: "GET",
      url: `${appUrl}/allEvents`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .its("status")
    .should("eq",200)
  });
  
  it("test for creating a new event", () => {
    cy.request({
      method: "POST",
      url: `${appUrl}/createEvent`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        eventName: "Test Event",
        venue: "Test Venue"
      }
    })
    .its("status")
    .should("eq",200)
  });
});
