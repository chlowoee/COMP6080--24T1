describe('Happy path', () => {
  it('happy path', () => {
    const name = 'Lebron James';
    const email = 'lebron@gmail.com';
    const password = 'AAAAHHHHHHH';
    const presName = 'monki';
    const presDesc = 'i luv monki';
    const presName2 = 'funky monki';

    cy.visit('localhost:3000/');
    cy.get('[aria-label="register-button"]').click();

    // registers
    cy.get('[aria-label="register-name"]')
    .focus()
    .type(name);

    cy.get('[aria-label="register-email"]')
    .focus()
    .type(email);

    cy.get('[aria-label="register-pw"]')
    .focus()
    .type(password);

    cy.get('[aria-label="register-pw-confirm"]')
    .focus()
    .type(password);

    cy.get('[aria-label="register-button"]').click();

    // expect location is dashboard once reg. is submitted
    expect(cy.location('pathname').should('eq', '/dashboard'));

    // Creates a new presentation successfully
    cy.get('[aria-label="new-pres-button"]').click();

    cy.get('[id="new-presentation-name"]')
    .focus()
    .type(presName);
    
    cy.get('[id="new-presentation-desc"]')
    .focus()
    .type(presDesc);

    cy.get('[aria-label="create-pres"]').click();
    
    // open additional info
    cy.get('[aria-label="expand-icon"]').click();

    // goes to edit slide
    cy.get('[aria-label="edit-pres-icon-button"]').click();
    expect(cy.location('pathname').should('eq', '/edit/presentation/1'));

    // Updates name
    cy.get('[aria-label="edit-pres-name-button"]').click();
    cy.get('[aria-label="edit-title-input"]')
      .click()
      .type(presName2)
    cy.get('[aria-label="edit-title-save"]').click();
  
    // thumbnail update
    cy.get('[aria-label="thumbnail-edit-button"]').click();
    cy.get('[aria-label="upload-thumbnail"]').click();
    
    // Add some slides in a slideshow deck successfully
    cy.get('[aria-label="new-slide-button-main"]').click();
    cy.get('[aria-label="new-slide-button-main"]').click();

    cy.get('[aria-label="open-drawer"]').click();
    
    // check there are 3 cards
    cy.get('.MuiCardContent-root').should('have.length', 3);
    cy.get('[aria-label="close-drawer-button"]').click();

    // Switch between slides successfully
    cy.get('[aria-label="main-screen-bottom-button"]')
    .find('[aria-label="next-slide-button"]')
    .click();
    cy.get('[aria-label="main-screen-bottom-button"]')
    .find('[aria-label="next-slide-button"]')
    .click();

    // go back to dashboard
    cy.get('[aria-label="back-to-dash-button"]').click();

    // open additional info
    cy.get('[aria-label="expand-icon"]').click();
    
    // Delete a presentation successfully
    cy.get('[aria-label="delete"]').click();
    cy.get('[aria-label="yes-button"]').click();
    cy.get('.MuiCard-root').should('not.exist');

    // Logs out of the application successfully
    cy.get('[aria-label="logout-button"]').click();
    expect(cy.location('pathname').should('eq', '/login'));

    // Logs back into the application successfully
    cy.get('[aria-label="email-input"]')
    .focus()
    .type(email);

    cy.get('[aria-label="pw-input"]')
    .focus()
    .type(password);
    cy.get('[aria-label="login-button"]').click();
    expect(cy.location('pathname').should('eq', '/dashboard'));
  })
})