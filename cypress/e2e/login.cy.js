import data from "../fixtures/data.json";

describe("Login", () => {

  it("TC1|Should login using valid credentials and get token", () => {
    cy.apiRequest('POST', '/api/auth', null, data.validCredentials, true)
    .then((response) => {
      expect(response.body.data.session.token).not.to.be.empty  
    })    
  })

  it("TC2|Should not be able to login using invalid credentials", () => {
    cy.apiRequest('POST', '/api/auth', null, data.invalidCredentials, false)
    .then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.message).to.equal("Invalid login credentials")
    })   
  })

  it("TC3|Should not be able to login with blank entry", () => {
    cy.apiRequest('POST', '/api/auth', null, data.blankEntry, false)
    .then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.message).to.equal("Invalid login credentials")
    })
  })
})

    /*
    //Extra test cases
    //To parse token data for testing Status, Role, Session expiration test cases
      const parts = token.split(".")
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString())
    */