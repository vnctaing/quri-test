import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import isValidUpca from '../src/utils/isValidUpca';
import removeEveryWhiteSpace from '../src/utils/removeEveryWhiteSpace';
import isCheckDigitValid from '../src/utils/isCheckDigitValid';
import App from '../src/App.js'
import Poll from '../src/Poll.js'

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
    it('should render a some html', function() {
      expect(
        shallow(<App />)
        .find('div.App')
      )
      .to.have.length(1);
    });

    it('should render a poll for valid upc-a and a textarea', function() {
      expect(shallow(<App />).find(Poll))
        .to.have.length(1);

      expect(shallow(<App />).find('textarea'))
        .to.have.length(1);
    });

    it('should have an initial state with `correctUpca`, `wrongUpca`, `stagingUpca` and `isFetching`', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state('wrongUpca')).to.deep.equal([]);
      expect(wrapper.state('correctUpca')).to.deep.equal([]);
      expect(wrapper.state('stagingUpca')).to.deep.equal([]);
      expect(wrapper.state('isFetching')).to.equal(false);
    });

    it('should push two items to `wrongUpca` if the textarea contains two wrong upc-a', () => {
      const wrapper = shallow(<App />);
      wrapper.find('textarea').simulate('change', { target: { value: 'foo\n82184090466' } });
      expect(wrapper.state('wrongUpca'))
        .to.deep.equal([
          { code: 'foo', 'reasons': ["UPC-A contains only numbers"] },
          { code: '82184090466', 'reasons': ["Leading zero might have been deleted"] },
        ]);
    });
    
    it('should push two items to `correctUpca` if the textarea contains two correct upc-a', () => {
      const wrapper = shallow(<App />);
      wrapper.find('textarea').simulate('change', { target: { value: '083085300265\n082184090466' } });
      expect(wrapper.state('correctUpca'))
        .to.deep.equal(['083085300265', '082184090466']);
    });


  });
});