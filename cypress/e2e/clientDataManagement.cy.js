/// <reference types="cypress" />

const apiKey = '8bc839e7-af79-4d06-a348-ccdb52cd567e';
const tenant = 'qa-getdal-1a';
const baseUrl = 'https://develop.api.getdal.sa';

describe('Client Data Management APIs - Status Check Only', () => {
  const clientId = 1;

  const apiRequest = (method, url, body = null) => {
    return cy.request({
      method,
      url: `${baseUrl}${url}`,
      headers: {
        'x-api-key': apiKey,
        'x-tenant': tenant,
      },
      body,
      failOnStatusCode: false, // Prevent Cypress from failing automatically
    });
  };

  it('Create a new client', () => {
    apiRequest('POST', '/clients', {
      type: 'Individual',
      idType: 'NationalIdentity',
      countryCode: 'SA',
      phoneNumber: '500000001',
      firstNameEn: 'John',
      lastNameEn: 'Doe',
      nameEn: 'John Doe',
      nationalityCode: 'SA',
      status: 'Active',
    }).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.be.oneOf([200, 201]);
    });
  });

  it('Get paginated clients', () => {
    apiRequest('GET', '/clients?page=1&size=5').then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Get client by ID', () => {
    apiRequest('GET', `/clients/${clientId}`).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Update client', () => {
    apiRequest('PUT', `/clients/${clientId}`, {
      type: 'Individual',
      idType: 'NationalIdentity',
      countryCode: 'SA',
      phoneNumber: '500000001',
      firstNameEn: 'John Updated',
      lastNameEn: 'Doe',
      nameEn: 'John Updated Doe',
      nationalityCode: 'SA',
      status: 'Active',
    }).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Update client status', () => {
    apiRequest('PATCH', `/clients/${clientId}/status`, { status: 'Blocked' }).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Get client status by ID', () => {
    apiRequest('GET', `/clients/${clientId}/status`).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Archive client', () => {
    apiRequest('PATCH', `/clients/${clientId}/archive`).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
    });
  });

  it('Get archived clients with cases', () => {
    apiRequest('GET', '/clients/archived-with-cases').then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.eq(200);
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
          nationalityCode: 'SA',
        },
        {
          type: 'Individual',
          idType: 'NationalIdentity',
          countryCode: 'SA',
          phoneNumber: '500000004',
          firstNameEn: 'Bulk',
          lastNameEn: 'Client2',
          nameEn: 'Bulk Client2',
          nationalityCode: 'SA',
        },
      ],
      duplicateMode: 'Skip',
    }).then((res) => {
      cy.log(`Status: ${res.status}`);
      expect(res.status).to.be.oneOf([200, 201]);
    });
  });
});
