const assert = require('assert');
const { expect } = require('chai');
const { generateUrl } = require('../src/url');

describe('Bindr : Binding Images', () => {
  describe('url.js', () => {
    it('should generate the url according to the text passed', () => {
      const generatedUrl = generateUrl('hello', 400, 500, 'Pink', 100);
      expect(generatedUrl).to.equal(
        'https://cataas.com/cat/says/hello?width=400&height=500&color=Pink&s=100',
      );
    });
  });
});
