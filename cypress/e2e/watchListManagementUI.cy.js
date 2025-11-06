(describe('Client Data Management UI Tests', () => {

    it('login', () => {
    cy.visit('https://qa-getdal-1a.getdal.sa/login');
    cy.get('#_r_0_-form-item').type('admin@getdal.com');
    cy.get('#_r_1_-form-item > input').type('WDR*7123412a');
    cy.get('body > div > div > form > button').click();
    cy.url().should('include', 'https://qa-getdal-1a.getdal.sa/');
    });

    it('Should navigate to Watch List Management module', () => {
      cy.xpath('/html/body/div/div/div[2]/div/div[2]/ul/ul/li[2]/a/button').click();
      cy.url().should('include', 'https://qa-getdal-1a.getdal.sa/watchlists');
    });


    it('Should create a new client', () => {
      cy.get('#radix-_r_47b_').click();
      cy.get('#radix-_r_47c_ > div').click();
      cy.get('#_r_488_-form-item').type('1');
      cy.get('#_r_48n_-form-item').select('Nafith');
      cy.get('#_r_48j_-form-item').type('Arkam');
      cy.xpath('//*[@id="radix-_r_25_"]/div[3]/form/div[14]/button[2]').click();
      cy.contains('ol > li').should('be.visible');
    });
  }))