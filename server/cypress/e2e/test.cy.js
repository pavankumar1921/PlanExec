describe(" tests", () => {
    beforeEach(() => {
      cy.request("POST", "http://localhost:3000/createEvent", {
        eventName: "test event",
        venue: "test venue"
      });
    });
  
    it("Fetch events", () => {
      cy.request("GET", "http://localhost:3000/")
        .its("status")
        .should("eq", 200);
    });
  
    it("Create a new event", () => {
      cy.request("POST", "http://localhost:3000/createEvent", {
        eventName: "test",
        venue: "enue"
      })
        .its("status")
        .should("eq", 201);
    });
  });
  