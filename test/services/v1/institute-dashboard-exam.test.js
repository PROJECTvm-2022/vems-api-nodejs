const app = require('../../../src/app');

describe('\'v1/institute-dashboard-exam\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/institute-dashboard-exam');
    expect(service).toBeTruthy();
  });
});
