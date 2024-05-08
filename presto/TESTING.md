## Component testing
Testing was carried out with cypress.

Ensure the database.json is clear before you run the tests.

The tests can be run using `npm run test`.

Component testing files are named `{component}.cy.jsx` and are stored in `frontend/cypress/integration`

Components tested:
1. Login
2. PresentationCard
3. Navbar

## UI testing
The happy path was carried out in this order in `/frontend/cypress/e2e/UITest.cy.js`

1. Registers successfully
2. Creates a new presentation successfully
3. Updates the thumbnail and name of the presentation successfully
4. Add some slides in a slideshow deck successfully
5. Switch between slides successfully
6. Delete a presentation successfully
7. Logs out of the application successfully
8. Logs back into the application successfully