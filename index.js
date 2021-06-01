const { writeFile } = require('fs');
const { join } = require('path');
const axios = require('axios').default;
const blend = require('@mapbox/blend');
const argv = require('minimist')(process.argv.slice(2));

const encoding = require('./encoding');
const requests = require('./src/requests');
const url = require('./src/url');
const buffer = require('./src/buffer');

const FILE_NAME = 'cat-card.jpg';

const {
  greeting = 'Hello',
  who = 'You',
  width = 400,
  height = 500,
  color = 'Pink',
  size = 100,
} = argv;

const bindImages = async () => {
  try {
    const firstRequest = requests.generateAxiosRequestByOptions({
      url: url.generateUrl(greeting, width, height, color, size),
      encoding: encoding.BINARY_ENCODING,
    });
    const secondRequest = requests.generateAxiosRequestByOptions({
      url: url.generateUrl(who, width, height, color, size),
      encoding: encoding.BINARY_ENCODING,
    });

    const responses = await axios.all([firstRequest, secondRequest]);

    if (responses[0].status === 200 && responses[1].status === 200) {
      console.log('Successfully received responses from CataaS');

      blend(
        [
          buffer.generateBufferObject(
            responses[0],
            0,
            0,
            encoding.BINARY_ENCODING,
          ),
          buffer.generateBufferObject(
            responses[1],
            width,
            0,
            encoding.BINARY_ENCODING,
          ),
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
          const fileOut = join(process.cwd(), `/${FILE_NAME}`);
          writeFile(fileOut, data, encoding.BINARY_ENCODING, (fileWriteErr) => {
            if (fileWriteErr) {
              console.log(fileWriteErr);
              return;
            }

            console.log(`The file was saved as ${FILE_NAME}!`);
          });
        },
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

bindImages()
  .then(() => {
    console.log('Images were succesfully bind');
  })
  .catch((err) => {
    console.log('Error binding image', err);
  });
