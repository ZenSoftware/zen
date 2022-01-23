// import { getGreeting } from '../support/app.po';

describe('portal', () => {
  beforeEach(() => cy.visit('/login'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('me@zen.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome to portal!');
    cy.get(`[type="submit"]`).contains('Login');
    cy.get(`[placeholder="Username"]`).type('zen');
  });
});
