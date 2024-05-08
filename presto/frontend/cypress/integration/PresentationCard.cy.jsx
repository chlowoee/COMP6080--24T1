import React from 'react'
import PresentationCard from '../../src/components/PresentationCard'
import { BrowserRouter } from 'react-router-dom';

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

const id = 1;
const setStore = () => {
}

describe('<PresentationCard />', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <PresentationCard store={store} id={id} setStore={setStore}/>
      </BrowserRouter>)
  });

  it('renders name of the presentation', () => {
    cy.contains('.MuiCardHeader-root', 'monki').should('exist');
  });

  it('renders description of the presentation', () => {
    cy.contains('.MuiCardContent-root', 'oo oo aa aa').should('exist');
  });

  it('renders the thumbnail image', () => {
    cy.get('.MuiCardMedia-img').should('exist');
  });

  it('renders the slide count with correct count', () => {
    cy.contains('#slide-count', '1 slide/s').should('exist');
  });

  it('renders the delete button', () => {
    cy.get('[aria-label="delete"]').should('exist');
  });

  it('renders the edit button', () => {
    cy.get('[aria-label="edit-pres-icon-button"]').should('exist');
  });

  it('clicking on the edit button calls navToPresentationId with the correct arguments', () => {
    cy.get('[aria-label="expand-icon"]').click();
    cy.get('[aria-label="edit-pres-icon-button"]').click();
    cy.url().should('include', '/edit/presentation/1');
  });

  it('clicking on the delete button makes a modal appear', () => {
    cy.get('[aria-label="expand-icon"]').click();
    cy.get('[aria-label="delete"]').click();

    // Check all the dialog components appear
    cy.get('.MuiDialog-container').should('be.visible');
    cy.contains('.MuiDialogTitle-root', 'Confirm Deletion').should('be.visible');
    cy.contains('.MuiDialogContentText-root', 'Are you sure you want to delete this presentation?').should('be.visible');
    cy.contains('button', 'No').should('be.visible');
    cy.contains('button', 'Yes').should('be.visible');
  });

  it('pressing no makes modal disappear', () => {
    cy.get('[aria-label="expand-icon"]').click();
    cy.get('[aria-label="delete"]').click();

    // click no, the modal should disappear
    cy.get('[aria-label="no-button"]').click();
    cy.get('.MuiDialog-container').should('not.be.visible');

    // Assert that the card is still present
    cy.get('.MuiCard-root').should('be.visible');
  });

  it('confirming delete removes the card', () => {
    cy.get('[aria-label="expand-icon"]').click();
    cy.get('[aria-label="delete"]').click();
    // click yes, the modal should disappear
    cy.get('[aria-label="yes-button"]').click();
    // Assert that the modal doesnt exist since the card is deleted
    cy.get('.MuiDialog-container').should('not.exist');
    // Assert that the card is removed from the DOM
    cy.get('.MuiCard-root').should('not.exist');
  });
})
