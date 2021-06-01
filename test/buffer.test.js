const assert = require('assert');
const axios = require('axios');
const { expect } = require('chai');
const { generateBufferObject } = require('../src/buffer');

describe('Bindr : Binding Images', () => {
  describe('buffer.js', () => {
    it('should generate a object containing a buffer', async () => {
      const response = await axios.get('http://httpbin.org/json', {
        responseType: 'arraybuffer',
      });
      const bufferObj = generateBufferObject(response, 100, 200, 'binary');
      expect(bufferObj).to.have.all.keys('buffer', 'x', 'y');
    });
  });
});
