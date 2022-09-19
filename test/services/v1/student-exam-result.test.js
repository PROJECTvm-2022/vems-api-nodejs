const app = require('../../../src/app');

describe('\'v1/student-exam-result\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/student-exam-result');
    expect(service).toBeTruthy();
  });
});
