describe("Login", () => {
  beforeEach(() => {})
  let token

  it("should login successfully", () => {
    cy.request({
      method: "POST",
      url: "https://qa-challenge-api.scratchpay.com/api/auth",
      body: {
        email: "gianna@hightable.test",
        password: "thedantonio1"
      }
    }).then((response) => {
      console.log(response)
      cy.log(response.body.data.session.token)
      token = response.body.data.session.token
      cy.log(token)
    })
  })
})
