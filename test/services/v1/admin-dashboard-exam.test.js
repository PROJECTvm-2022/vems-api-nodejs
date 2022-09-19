const app = require('../../../src/app');

describe('\'v1/admin-dashboard-exam\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/admin-dashboard-exam');
    expect(service).toBeTruthy();
  });
});
