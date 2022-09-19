const app = require('../../../src/app');

describe('\'v1/authenticate-email\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/authenticate-email');
    expect(service).toBeTruthy();
  });
});
