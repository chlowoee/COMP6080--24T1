import React from 'react'
import Navbar from '../../src/components/Navbar'
import { BrowserRouter } from 'react-router-dom';

// general constants to parse into functions
const store = {
  store: {
    1: {
      name: 'monki',
      description: 'oo oo aa aa',
      defaultColor: '',
      thumbnail: 'default',
      slides: [
        {
          slideContent: []
        }
      ]

    }
  }
}

const token = 'randomtoken';
const setStore = () => {
}
const setTokenFunction = () => {
}

describe('<Navbar /> test', () => {
  context('when on default route', () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <Navbar store={store} token={token} setStore={setStore} setTokenFunction={setTokenFunction} />
        </BrowserRouter>
      )
    });

    it('displays the Presto title', () => {
      cy.contains('Presto').should('be.visible');
    });

    it('no buttons should exist', () => {
      cy.get('button').should('not.exist');
    });
  });

  context('when on the Login route', () => {
    beforeEach(() => {
      window.history.pushState({}, null, '/login')
      cy.mount(
        <BrowserRouter>
          <Navbar store={store} token={token} setStore={setStore} setTokenFunction={setTokenFunction} />
        </BrowserRouter>
      )
      cy.location('pathname').should('equal', '/login')
    });

    it('displays the Presto title', () => {
      cy.contains('Presto').should('be.visible');
    });

    it('displays the Register button', () => {
      cy.contains('Register').should('be.visible');
    });

    it('clicking the Register button', () => {
      cy.get('[aria-label="register-button"]').click();
      cy.url().should('include', '/register');
    });
  });

  context('when on the Register route', () => {
    beforeEach(() => {
      window.history.pushState({}, null, '/register')
      cy.mount(
        <BrowserRouter>
          <Navbar store={store} token={token} setStore={setStore} setTokenFunction={setTokenFunction} />
        </BrowserRouter>
      )
      cy.location('pathname').should('equal', '/register')
    });

    it('displays the Presto title', () => {
      cy.contains('Presto').should('be.visible');
    });

    it('displays the Back button', () => {
      cy.contains('Back').should('be.visible');
    });

    it('clicking the Back button', () => {
      cy.get('[aria-label="back-button"]').click();
      cy.url().should('include', '/login');
    });
  });

  context('when on the dashboard route', () => {
    beforeEach(() => {
      window.history.pushState({}, null, '/dashboard')
      cy.mount(
        <BrowserRouter>
          <Navbar store={store} token={token} setStore={setStore} setTokenFunction={setTokenFunction} />
        </BrowserRouter>
      )
      cy.location('pathname').should('equal', '/dashboard')
    });

    it('displays the Dashboard title', () => {
      cy.contains('Dashboard').should('be.visible');
    });

    it('displays the new presentation and logout', () => {
      cy.contains('New Presentation').should('be.visible');
      cy.contains('Logout').should('be.visible');
    });

    it('clicking the new presentation button', () => {
      cy.get('[aria-label="new-pres-button"]').click();

      // Check all the dialog components appear
      cy.get('.MuiDialog-container').should('be.visible');
      cy.contains('.MuiDialogTitle-root', 'Create New Presentation').should('be.visible');
      cy.get('#new-presentation-name').should('be.visible').type('New Presentation Name');
      cy.get('#new-presentation-desc').should('be.visible').type('Presentation Description');
      cy.contains('button', 'Create').should('be.visible');
      cy.contains('button', 'Cancel').should('be.visible');
    });
  });
});
