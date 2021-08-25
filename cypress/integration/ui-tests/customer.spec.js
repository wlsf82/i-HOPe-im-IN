describe('Customers App UI', () => {
  const salesRepresentative = 'John Doe'
  const currentTimestamp = (new Date()).toDateString()

  beforeEach(() => {
    cy.visit('/')
  })

  context('Welcome Screen', () => {
    it('shows h1, paragraph, text input field, and submit button', () => {
      cy.contains('h1', 'Welcome to Customer App').should('be.visible')
      cy.contains('p', 'Please provide your name:').should('be.visible')
      cy.get('input[type="text"]').should('be.visible')
      cy.get('input[type="button"][value="Submit"]').should('be.visible')
    })

    it('alerts when no name is provided', () => {
      cy.get('input[type="button"][value="Submit"]').click()

      cy.on('window:alert', alert => {
        expect(alert).to.equal('Please provide your name')
      })
    })

    it('directs the user to the Customer List Screen', () => {
      cy.get('input[type="text"]').type(salesRepresentative)
      cy.get('input[type="button"][value="Submit"]').click()

      cy.contains(`Hi ${salesRepresentative}. It is now ${currentTimestamp} and here is our customer list. Click on each of them to view their contact details.`)
      cy.get('table')
        .should('be.visible')
        .and('contain', 'Name')
        .and('contain', '# of Employees')
        .and('contain', 'Size')
        .find('tbody tr').should('have.length.gte', 1)
    })
  })

  context('Fill in the text field and submit', () => {
    beforeEach(() => {
      cy.intercept('POST', Cypress.env('API_URL'), { fixture: 'customers' })
        .as('postReq')
      cy.get('input[type="text"]').type(salesRepresentative)
      cy.get('input[type="button"][value="Submit"]').click()
    })

    context('Customer List Screen', () => {
      it('greets and shows a table with headings and six rows', () => {
        cy.contains(`Hi ${salesRepresentative}. It is now ${currentTimestamp} and here is our customer list. Click on each of them to view their contact details.`)
        cy.get('table').as('table')
          .should('be.visible')
          .find('thead')
          .and('contain', 'Name')
          .and('contain', '# of Employees')
          .and('contain', 'Size')
        cy.get('@table')
          .find('tbody tr').should('have.length', 5)
      })

      it('shows the right size based on the # of employees', () => {
        cy.get('table')
          .find('tbody tr').as('tableRows')
          .eq(0)
          .should('contain', 'Small')
        cy.get('@tableRows')
          .eq(1)
          .should('contain', 'Medium')
        cy.get('@tableRows')
          .eq(2)
          .should('contain', 'Big')
        cy.get('@tableRows')
          .eq(3)
          .should('contain', 'Small')
        cy.get('@tableRows')
          .eq(4)
          .should('contain', 'Medium')
      })
    })

    context('Contacts Detail Screen', () => {
      it('shows contact info', () => {
        cy.get('table tbody tr')
          .first()
          .find('a')
          .click()

        cy.contains('p', 'Greg H. (customer@one.com)')
          .should('be.visible')
      })

      it('shows "No contact info available"', () => {
        cy.get('table tbody tr')
          .eq(3)
          .find('a')
          .click()

        cy.contains('p', 'No contact info available')
          .should('be.visible')
      })

      it('goes back to the Customer List Screen', () => {
        cy.get('table tbody tr')
          .first()
          .find('a')
          .click()

        cy.get('input[type="button"][value="Back to the list"]').click()

        cy.get('table').should('be.visible')
      })
    })
  })
})
