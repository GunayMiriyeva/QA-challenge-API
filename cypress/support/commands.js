/// <reference types="cypress" />
//GLOBAL METHODS
// ******************************************************************************************
//API Request
Cypress.Commands.add("apiRequest", (method, url, headers, body, failOnStatusCode) => {
    cy.request({
        method: method,
        url: Cypress.env('qaUrl') + url,
        headers: headers,
        body: body,
        failOnStatusCode: failOnStatusCode
      })
  })