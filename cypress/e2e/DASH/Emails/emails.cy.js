describe('My First Test', () => {
  it.only('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
  })
})