const { writeFile } = require('fs');
const { join } = require('path');
const axios = require('axios').default;
const blend = require('@mapbox/blend');
const argv = require('minimist')(process.argv.slice(2));

const BINARY_ENCODING = 'binary';
const ARRAY_BUFFER_ENCODING = 'arraybuffer';

const {
  greeting = 'Hello',
  who = 'You',
  width = 400,
  height = 500,
  color = 'Pink',
  size = 100,
} = argv;

// generates the URL based on the passed arguments
const generateUrl = (text) => `https://cataas.com/cat/says/${text}?width=${width}&height=${height}&color=${color}&s=${size}`;

// generates an axios request when request options are passed.
// requestOptions object must contain url and optional encoding
const generateAxiosRequestByOptions = (requestOptions) => {
  const responseType = requestOptions.encoding === BINARY_ENCODING
    ? ARRAY_BUFFER_ENCODING
    : requestOptions.encoding;
  return axios.get(requestOptions.url, { responseType });
};

const generateBufferObject = (response, x, y, encoding) => ({
  buffer: Buffer.from(response.data, encoding),
  x,
  y,
});

(async (bindImages) => {
  try {
    const firstRequest = generateAxiosRequestByOptions({
      url: generateUrl(greeting),
      encoding: BINARY_ENCODING,
    });
    const secondRequest = generateAxiosRequestByOptions({
      url: generateUrl(who),
      encoding: BINARY_ENCODING,
    });

    const responses = await axios.all([firstRequest, secondRequest]);

    if (responses[0].status === '200' && responses[1].status === '200') {
      console.log('Successfully received responses from CataaS');

      blend(
        [
          generateBufferObject(responses[0], 0, 0, BINARY_ENCODING),
          generateBufferObject(responses[1], width, 0, BINARY_ENCODING),
        ],
        {
          width: width * 2,
          height,
          format: 'jpeg',
        },
        (err, data) => {
          if (err) {
            console.log('Error binding the images');
          }
          const fileOut = join(process.cwd(), '/cat-card.jpg');
          writeFile(fileOut, data, BINARY_ENCODING, (err) => {
            if (err) {
              console.log(err);
              return;
            }

            console.log('the file was saved!');
          });
        },
      );
    }
  } catch (error) {
    console.error(error.message);
  }
})();

module.exports = {
  generateUrl,
  generateBufferObject,
  generateAxiosRequestByOptions,
};
