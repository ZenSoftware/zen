describe('portal', () => {
  beforeEach(() => cy.visit('/login'));

  it('should write zen into the username textbox', () => {
    cy.get(`[autocomplete="username"]`).type('zen');
  });
});
