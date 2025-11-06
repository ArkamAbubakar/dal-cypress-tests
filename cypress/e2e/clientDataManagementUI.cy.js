(describe('Client Data Management UI Tests', () => {

    it('login', () => {
    cy.visit('https://qa-getdal-1a.getdal.sa/login');
    cy.get('#_r_0_-form-item').type('admin@getdal.com');
    cy.get('#_r_1_-form-item > input').type('WDR*7123412a');
    cy.get('body > div > div > form > button').click();
    cy.url().should('include', 'https://qa-getdal-1a.getdal.sa/');
    });

    it('Should navigate to Client Data Management module', () => {
      cy.xpath('/html/body/div/div/div[2]/div/div[2]/ul/ul/li[3]/a/button').click();
      cy.url().should('include', 'https://qa-getdal-1a.getdal.sa/clients');
    });

    it('Should create a new client', () => {
      cy.get('#radix-_r_1t_').click();
      cy.get('#radix-_r_1u_ > div').click();
      cy.get('#_r_q0_-form-item').select('NationalIdentity');
      cy.get('#_r_q2_-form-item').type('1000000001');
      cy.get('#_r_q3_-form-item').type('Arkam');
      cy.get('#_r_q6_-form-item').type('Arkam');
      cy.xpath('//*[@id="radix-_r_2u_"]/div[3]/form/div[3]/div/button[2]').click();
      cy.contains('ol > li').should('be.visible');
    });
  }))