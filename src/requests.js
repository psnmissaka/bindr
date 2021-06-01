const axios = require('axios');
const encoding = require('./encoding');

// generates an axios request when request options are passed.
// requestOptions object must contain url and optional encoding
const generateAxiosRequestByOptions = (requestOptions) => {
  const responseType =
    requestOptions.encoding === encoding.BINARY_ENCODING
      ? encoding.ARRAY_BUFFER_ENCODING
      : requestOptions.encoding;
  return axios.get(requestOptions.url, { responseType });
};

module.exports = {
  generateAxiosRequestByOptions,
};
