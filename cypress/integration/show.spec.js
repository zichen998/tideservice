describe('Show page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8084/#/')
    // Click Donate navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(3)').click()
  })

  it('allows a valid product to be submitted', () => {
    // Fill out web form
    cy.get('#size').select('XL')
    cy.get('[data-test-amount]').type(321)
    cy.get('label').contains('Name').next().type('Best wishes')
    cy.contains('Thanks for your Showing!').should('not.exist')
    cy.get('.error').should('not.exist')
    cy.get('[data-test-manageProducts]').click()
    // cy.contains('Thanks for your Showing!').should('exist')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get('button[type=submit]').click()
    // cy.get('.error').contains('Amount')
    // cy.get('.error').contains('Name')
    cy.get('[data-test-amount]').type(321)
    // cy.get('.error').contains('Amount').should('not.exist')
    cy.get('[data-test-Name]').contains('Name').next().type('Best wishes')
    cy.get('.error').should('not.exist')
  })
})
