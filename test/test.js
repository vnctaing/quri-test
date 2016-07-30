const assert = require('chai').assert;
const isValidUpca = require('../src/utils/isValidUpca');

describe('Utils function', function() {
  describe('isValidUpca()', function() {
    it('should return return when the value a valid upc-a', function() {
      assert.equal(true, isValidUpca.default('889714000045'));
    });

    it("should return ['UPC-A contains only numbers'] when the value is not a number", function() {
      assert.deepEqual(['UPC-A contains only numbers'], isValidUpca.default('8abde') )
    });

    it("should return ['It isn't a valid UPC-A code (12 characters)'] when value is not a number of 12 digits", function() {
      assert.deepEqual(["It isn't a valid UPC-A code (12 characters)"], isValidUpca.default('88971400004432123'))
    });
    
    it("should.return ['Leading zero might have been deleted'] when UPC-A code miss the leading 0", function() {
      assert.deepEqual(['Leading zero might have been deleted'], isValidUpca.default('82184090466'))
    });

    it("should.return['Unvalid UPC-A code. Check for mispell'] when 12 digit giberrish are submitted", function() {
      assert.deepEqual(['Unvalid UPC-A code. Check for mispell'], isValidUpca.default('123123123123'))
    });
  });

  describe('removeEveryWhiteSpace()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });


});