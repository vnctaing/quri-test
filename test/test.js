import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import isValidUpca from '../src/utils/isValidUpca';
import removeEveryWhiteSpace from '../src/utils/removeEveryWhiteSpace';
import isCheckDigitValid from '../src/utils/isCheckDigitValid';
import App from '../src/App.js'

describe('Utils function', function() {
  describe('isValidUpca()', function() {
    it('should return true when the value a valid upc-a', function() {
      assert.equal(true, isValidUpca('889714000045'));
    });

    it("should return ['UPC-A contains only numbers'] when the value is not a number", function() {
      assert.deepEqual(['UPC-A contains only numbers'], isValidUpca('8abde'));
    });

    it("should return ['It isn't a valid UPC-A code (12 characters)'] when value is not a number of 12 digits", function() {
      assert.deepEqual(["It isn't a valid UPC-A code (12 characters)"], isValidUpca('88971400004432123'));
    });
    
    it("should.return ['Leading zero might have been deleted'] when UPC-A code miss the leading 0", function() {
      assert.deepEqual(['Leading zero might have been deleted'], isValidUpca('82184090466'));
    });

    it("should.return['Unvalid UPC-A code. Check for mispell'] when 12 digit giberrish are submitted", function() {
      assert.deepEqual(['Unvalid UPC-A code. Check for mispell'], isValidUpca('123123123123'));
    });
  });

  describe('removeEveryWhiteSpace()', function() {
    it('should return a string without white space when string is submitted', function() {
      assert.equal('123123123', removeEveryWhiteSpace('       123 123 123    '));
    });

    it('should return the number stringified when number is submitted', function() {
      assert.equal('213', removeEveryWhiteSpace(213));
    });
  });

  describe('isCheckDigitValid()', function () {
    it('should return true if digit check is valid', function() {
      assert.equal(true, isCheckDigitValid('889714000045'));
    })

    it('should return false if digit check is not valid', function() {
      assert.equal(false, isCheckDigitValid('889714000049'));
    })
  });
});


describe('React components', function() {
  describe('<App/>', function() {
    it('should render a textarea', function() {
      expect(shallow(<App />).contains(<div className="App"/>)).to.equal(true);
    });
  });
});