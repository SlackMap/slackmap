describe('ui-pwa', () => {
  beforeEach(() => cy.visit('/iframe.html?id=updatedialogcomponent--primary'));

  it('should render the component', () => {
    cy.get('sm-update-dialog').should('exist');
  });
});
