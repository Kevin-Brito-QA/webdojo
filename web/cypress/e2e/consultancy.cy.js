describe('Formulario de Consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.get('#name').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('11 99999-1000')
            .should('have.value', '(11) 99999-1000')

        ////label[text()="Tipo de Consultoria"]/..//select X-path que o Cypress não reconhece, então utilizei o método abaixo para selecionar o elemento.
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('span', 'Pessoa Jurídica')
            .parent()
            .find('input[type="radio"]')
            .check()

        cy.get('input[placeholder="00.000.000/0000-00"]')
            .type('11.111.111/1111-11')
            .should('have.value', '11.111.111/1111-11')

        cy.contains('label', 'Instagram')
            .find('input')
            .check()
            .should('be.checked')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Mensagem de teste para consultoria individual.')


        const tech = [
            'JavaScript',
            'Node.js',
            'React',
            'Vue.js',
            'Angular'
        ]

        tech.forEach((technology) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(technology + '{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .find('span')
                .should('contain.text', technology)
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')


    })


})