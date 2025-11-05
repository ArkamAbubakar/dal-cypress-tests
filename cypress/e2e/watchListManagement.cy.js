/// <reference types="cypress" />

const apiKey = '8bc839e7-af79-4d06-a348-ccdb52cd567e';
const tenant = 'qa-getdal-1a';
const baseUrl = 'https://qa-getdal-1a.getdal.sa';

describe('Watchlist Management APIs', () => {

  const apiRequest = (method, url, body = null) => {
    return cy.request({
      method,
      url: `${baseUrl}${url}`,
      headers: {
        'x-api-key': apiKey,
        'x-tenant': tenant
      },
      body,
      failOnStatusCode: false
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
      allowAutoOnboarding: true
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.created).to.be.true;
      expect(res.body.client).to.have.property('id');
      expect(res.body.matchCount).to.be.a('number');
    });
  });

  it('Bulk insert clients for ongoing monitoring', () => {
    apiRequest('POST', '/clients/bulk', {
      clients: [
        {
          type: 'Individual',
          idType: 'NationalIdentity',
          countryCode: 'SA',
          phoneNumber: '500000003',
          firstNameEn: 'Bulk',
          lastNameEn: 'Client1',
          nameEn: 'Bulk Client1',
          nationalityCode: 'SA'
        },
        {
          type: 'Individual',
          idType: 'NationalIdentity',
          countryCode: 'SA',
          phoneNumber: '500000004',
          firstNameEn: 'Bulk',
          lastNameEn: 'Client2',
          nameEn: 'Bulk Client2',
          nationalityCode: 'SA'
        }
      ],
      duplicateMode: 'Skip'
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('message');
    });
  });

});
