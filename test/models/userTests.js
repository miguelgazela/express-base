var assert = require("assert");

describe("User Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal(0, [1,2,3].indexOf(1));
    });
  });
});