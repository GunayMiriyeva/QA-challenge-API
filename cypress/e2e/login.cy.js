describe("Login", () => {
  let token, payload

  before("login and get token", () => {
    cy.request({
      method: "POST",
      url: "https://qa-challenge-api.scratchpay.com/api/auth",
      body: {
        email: "gianna@hightable.test",
        password: "thedantonio1"
      }
    }).then((response) => {
      token = response.body.data.session.token
      const parts = token.split(".")
      payload = JSON.parse(Buffer.from(parts[1], "base64").toString())
      cy.log(payload)
    })
  })

  it("TC1 - should not be able to log in using invalid credentials", () => {
    cy.request({
      method: "POST",
      url: "https://qa-challenge-api.scratchpay.com/api/auth",
      failOnStatusCode: false,
      body: {
        email: "gianna@hightable.test",
        password: "test"
      }
    }).then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.message).to.equal("Invalid login credentials")
    })
  })

  it("TC2 - should not be able to log in with blank entry", () => {
    cy.request({
      method: "POST",
      url: "https://qa-challenge-api.scratchpay.com/api/auth",
      failOnStatusCode: false,
      body: {
        email: "",
        password: ""
      }
    }).then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.message).to.equal("Invalid login credentials")
    })
  })

  it("TC3 - Get Emails with Valid credentials", () => {
    cy.request({
      method: "GET",
      url: "https://qa-challenge-api.scratchpay.com/api/clinics/2/emails",
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.error).to.equal("Error: User does not have permissions")
    })
  })
})
