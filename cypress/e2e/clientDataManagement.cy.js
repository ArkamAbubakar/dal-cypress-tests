/// <reference types="cypress" />

const apiKey = '8bc839e7-af79-4d06-a348-ccdb52cd567e';
const tenant = 'qa-getdal-1a';
const baseUrl = 'https://qa-getdal-1a.getdal.sa';

describe('Client Data Management APIs', () => {
  let clientId;

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
      status: 'Active'
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.created).to.be.true;
      clientId = res.body.client.id;
    });
  });

  it('Get paginated clients', () => {
    apiRequest('GET', '/clients?page=1&size=5').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.be.an('array');
    });
  });

  it('Get client by ID', () => {
    apiRequest('GET', `/clients/${clientId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.id).to.eq(clientId);
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
      status: 'Active'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.firstNameEn).to.eq('John Updated');
    });
  });

  it('Update client status', () => {
    apiRequest('PATCH', `/clients/${clientId}/status`, { status: 'Blocked' }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('Blocked');
    });
  });

  it('Get client status by ID', () => {
    apiRequest('GET', `/clients/${clientId}/status`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.be.oneOf(['Active', 'Blocked', 'Screening', 'Onboarding']);
    });
  });

  it('Archive client', () => {
    apiRequest('PATCH', `/clients/${clientId}/archive`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.isArchived).to.be.true;
    });
  });

  it('Get archived clients with cases', () => {
    apiRequest('GET', '/clients/archived-with-cases').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.be.an('array');
    });
  });
});
