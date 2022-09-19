const app = require('../../../src/app');

describe('\'v1/google-login\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/google-login');
    expect(service).toBeTruthy();
  });
});
