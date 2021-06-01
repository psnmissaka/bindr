// given a arraybuffer response, x, y and encoding type, generates and object which contains a
// buffer according to the encoding type and x,y
const generateBufferObject = (response, x, y, encodingType) => ({
  buffer: Buffer.from(response.data, encodingType),
  x,
  y,
});

module.exports = {
  generateBufferObject,
};
