import React from 'react'
import Login from '../../src/pages/Login'
import { BrowserRouter } from 'react-router-dom';

const email = 'testing@email.com';
const password = 'pwyay';
const token = 'null';
const setTokenFunction = () => {
}

describe('<Login />', () => {
  beforeEach(() => {
    window.history.pushState({}, null, '/login')
    cy.mount(
      <BrowserRouter>
        <Login token={token} setTokenFunction={setTokenFunction}/>
      </BrowserRouter>)
  });

  it('renders login form', () => {
    context('when on login route', () => {
      cy.contains('.input-group-text', 'Email').should('exist');
      cy.contains('.input-group-text', 'Password').should('exist');
      cy.get('[aria-label="email-input"]').should('have.value', '');
      cy.get('[aria-label="pw-input"]').should('have.value', '');
      cy.get('[aria-label="login-button"]').should('exist');
      cy.get('[aria-label="register-button"]').should('exist');
      cy.contains('Presto').should('exist');
    });
  });

  it('typing in the form updates the values of email and password', () => {
    cy.get('[aria-label="email-input"]').type(email).should('have.value', email);
    cy.get('[aria-label="pw-input"]').type(password).should('have.value', password);
  });

  it('submits email and password to loginApi function', () => {
    cy.get('[aria-label="email-input"]').type(email);
    cy.get('[aria-label="pw-input"]').type(password);
    cy.get('[aria-label="login-button"]').click();
    cy.get('[aria-label="email-input"]').should('have.value', '');
    cy.get('[aria-label="pw-input"]').should('have.value', '');
  });

  it('logs in when Enter key is pressed in the password input field', () => {
    cy.get('[aria-label="email-input"]').type(email);
    cy.get('[aria-label="pw-input"]').type(`${password}{enter}`);
    cy.get('[aria-label="email-input"]').should('have.value', '');
    cy.get('[aria-label="pw-input"]').should('have.value', '');
  });

  context('when on login route', () => {
    it('redirect to register when register button is pressed', () => {
      cy.get('[aria-label="register-button"]').click();
      cy.get('[aria-label="back-button"]').should('exist');
    });
  });
})

