const app = require('../../../src/app');

describe('\'v1/uploads\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/uploads');
    expect(service).toBeTruthy();
  });
});
