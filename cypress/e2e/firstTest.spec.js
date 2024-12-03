/// <reference types="cypress" />

//define test suit: describe() or context()
describe('First test suit ', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag name
        cy.get('input')

        //by ID - add # before element 
        cy.get('#inputEmail1')

        //by class value - put dot in from of element 
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[fullwidth]')

        //by attribute and value 
        cy.get('[placeholder="Email"]')

        // by entire class value 
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two attributes 
        cy.get('[placeholder="Email"][fullwidth]')
        
        //by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test_id
        cy.get('[data-cy="imputEmail1"]')
    })

    it ('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Theory
        // get () - find elements on the page by locator globally
        // find() - find child elements by locator 
        //contains() - find HTML text and by text and locator  -lloking for the first match on the page 

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')

        //cypress chains and DOM 
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it ('save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // CANT DO THINGS LIKE THIS 
        // const usingGrid = cy.contains('nb-card', 'Using the Grid')
        // cy.contains('nb-card', 'Using the Grid').find('[for=inputEmail1').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for=inputPassword2').should('contain', 'Password')
        

        // Using cypress allias

        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for=inputEmail1').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for=inputPassword2').should('contain', 'Password')

        //Using then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for=inputEmail1').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for=inputPassword2').should('contain', 'Password')
        })
    })

    it ('extract text value' , () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        // 4 
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        // 5 invoke property (e.x. input text in input field)
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com').then(property => {
            expect(property.to.equal('test@test.com'))
        })

    })

    it ('radio buttons', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
            // if element isn'tvisible - we can use force: true
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })

    })

    it.only('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').uncheck({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).click({force:true})
    })

})


