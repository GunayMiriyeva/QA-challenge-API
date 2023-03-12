describe("access to email list", () => {
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
  it("TC1 - should not get access to emails without authentication", () => {
    cy.request({
      method: "GET",
      url: "https://qa-challenge-api.scratchpay.com/api/clinics/2/emails",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })

  it("TC2 - should be able to get results using 'veterinary' term in search", () => {
    cy.request({
      method: "GET",
      url: "https://qa-challenge-api.scratchpay.com/api/clinics?term=veterinary",
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.isOkStatusCode).to.equal(true)
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response).not.to.be.empty
      expect(response.body.data.length).to.be.greaterThan(0)
    })
  })

  it("TC3 - should not have access to search results without authentication", () => {
    cy.request({
      method: "GET",
      url: "https://qa-challenge-api.scratchpay.com/api/clinics?term=veterinary",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })

  it("TC4 - should not be able to search without login and authorization", () => {
    // remove token from local storage
    localStorage.removeItem("token")
    cy.request({
      method: "GET",
      url: "https://qa-challenge-api.scratchpay.com/api/clinics?term=veterinary",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })
})