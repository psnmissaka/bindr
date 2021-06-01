const { expect } = require('chai');
const { generateAxiosRequestByOptions } = require('../src/requests');

describe('Bindr : Binding Images', () => {
  describe('request.js', () => {
    it('should generate a correct axios request according to the request options passed', async () => {
      const requestOptions = {
        url: 'https://cataas.com/cat/says/hello?width=400&height=500&color=Pink&s=100',
        encoding: 'binary',
      };
      const response1 = await generateAxiosRequestByOptions(requestOptions);

      expect(response1.headers['content-type']).to.be.oneOf([
        'image/jpeg',
        'image/png',
      ]);
      expect(
        parseInt(response1.headers['content-length'], 10),
      ).to.be.greaterThan(0);
    });
  });
});
