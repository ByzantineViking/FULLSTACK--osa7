
// Documentation for mocha, which Cypress uses internally recommends
// not to use arrow functions, as they might cause issues in some cases.
describe('Functionality:  ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Liima Puikko',
            username: 'Liima',
            password: 'hunter2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function () {
        cy.contains('log in to application')
    })

    describe('when logged in', function () {
        beforeEach( function() {
            cy.get('input:first')
                .type('Liima')
            cy.get('#password')
                .type('hunter2')
            cy.get('#loginButton')
                .click()
        })
        it('user can log in', function () {
            cy.contains('Liima Puikko logged in')
        })
        describe('After blog creation', function () {
            beforeEach( function() {
                cy.contains('Blogs').click()
                cy.contains('create new')
                    .click()
                cy.get('[data-cy=title]')
                    .type('Parhaat keksit missään!')
                cy.get('[data-cy=author]')
                    .type('Liisa')
                cy.get('[data-cy=url]')
                    .type('liisankeksit.fi')
                cy.get('[data-cy=createButton]')
                    .click()
            })
            it('blog appears', function() {
                cy.contains('Parhaat keksit missään!')
            })
            it('expand works', function() {
                cy.get('[data-cy=expand]')
                    .click()
                cy.contains('like')
            })
        })
        it('navigation works', function() {
            cy.contains('Users').click()
            cy.contains('Blogs created')
            cy.contains('Blogs').click()
            cy.contains('Author')
        })
        it('logout, and re-login work', function() {
            cy.contains('logout').click()
            cy.contains('log in to application')
            cy.get('#loginButton')
                .click()
            cy.contains('Liima Puikko logged in')
        })
    })
})
