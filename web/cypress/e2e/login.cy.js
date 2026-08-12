describe('Login', () => {
  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')
    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')
  })

  it('Não deve logar com senha incorreta', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email incorreto', () => {
    cy.start()
    cy.submitLoginForm('aaaa@webdojo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
    })
})
