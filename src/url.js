// generates the URL based on the passed arguments
const generateUrl = (text, width, height, color, size) =>
  `https://cataas.com/cat/says/${text}?width=${width}&height=${height}&color=${color}&s=${size}`;

module.exports = {
  generateUrl,
};
