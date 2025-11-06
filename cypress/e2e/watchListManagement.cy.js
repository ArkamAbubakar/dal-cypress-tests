/// <reference types="cypress" />

const apiKey = '8bc839e7-af79-4d06-a348-ccdb52cd567e';
const tenant = 'qa-getdal-1a';
const baseUrl = 'https://develop.api.getdal.sa';

describe('Watchlist Management APIs - Status Check Only', () => {
  const apiRequest = (method, url, body = null) => {
    return cy.request({
      method,
      url: `${baseUrl}${url}`,
      headers: {
        'x-api-key': apiKey,
        'x-tenant': tenant,
      },
      body,
      failOnStatusCode: false, // prevents Cypress from failing automatically
    });
  };

  it('Perform client screening against watchlists', () => {
    apiRequest('POST', '/clients/screening', {
      type: 'Individual',
      idType: 'NationalIdentity',
      countryCode: 'SA',
      phoneNumber: '500000002',
      firstNameEn: 'Watch',
      lastNameEn: 'List',
      nameEn: 'Watch List',
      nationalityCode: 'SA',
      allowAutoOnboarding: true,
    }).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.be.oneOf([200, 201]);
    });
  });
});
