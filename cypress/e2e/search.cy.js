import data from "../fixtures/data.json";

describe("Search options", () => {
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

  it("TC6|Should be able to get results using 'veterinary' term in search", () => {
    cy.apiRequest('GEt', '/api/clinics?term=veterinary', headers, null, false)
    .then((response) => {
      expect(response.isOkStatusCode).to.equal(true)
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal("OK")
      expect(response).not.to.be.empty
      expect(response.body.data.length).to.be.greaterThan(0)
    })
  })

  it("TC7|Should not have access to search results without authentication", () => {
    cy.apiRequest('GEt', '/api/clinics?term=veterinary', null, null, false)
    .then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })

  it("TC8|Should not be able to search without login and authorization", () => {
    //Remove token/session
    localStorage.removeItem("token")
    cy.apiRequest('GEt', '/api/clinics?term=veterinary', null, null, false)
    .then((response) => {
      expect(response.body.ok).to.equal(false)
      expect(response.status).to.equal(401)
      expect(response.body.data.message).to.equal("You need to be authorized for this action.")
    })
  })
})