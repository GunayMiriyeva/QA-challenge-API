import data from "../fixtures/data.json";

describe("Email list", () => {
  let token, headers

  before("Login to get Token and set Headers", () => {
    cy.apiRequest('POST', '/api/auth', headers, data.validCredentials, true)
    .then((response) => {
      token = response.body.data.session.token
      headers = {
        authorization: `Bearer ${token}`
      }
    })
  })

  it("TC4|Should not get access to emails with authentication and 'Clinics' role", () => {
    cy.apiRequest('GEt', '/api/clinics/2/emails', headers, null, false)
    .then((response) => {
      expect(response.isOkStatusCode).to.equal(false)
      expect(response.status).to.equal(400)
      expect(response.statusText).to.equal("Bad Request")
      expect(response.body.data.error).to.equal("Error: User does not have permissions")
    })
  })

  it("TC5|Should not get access to emails without authentication", () => {
    cy.apiRequest('GEt', '/api/clinics/2/emails', null, null, false)
    .then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })
})