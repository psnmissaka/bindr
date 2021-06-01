const assert = require("assert");
const { expect } = require("chai");
const { generateUrl } = require("../index");

describe("Bindr : Binding Images", () => {
  describe("generateUrl", () => {
    it("should generate the url according to the text passed", () => {
      const generatedUrl = generateUrl("hello");
      expect(generatedUrl).to.equal(
        "https://cataas.com/cat/says/hello?width=400&height=500&color=Pink&s=100"
      );
    });
  });
});
