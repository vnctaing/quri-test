import removeEveryWhiteSpace from './removeEveryWhiteSpace'
import isCheckDigitValid from './isCheckDigitValid'

export default function isValidUpca(code) {
  code = removeEveryWhiteSpace(code);
  const reasons = [];

  const isTwelveCharacterLong = code.length === 12;
  const isElevenCharacterLong = code.length === 11;

  if (isNaN(code)) {
    reasons.push("UPC-A contains only numbers")
  } else {
    if (!isTwelveCharacterLong) {
      reasons.push("It isn't a valid UPC-A code (12 characters)")
    }
    
    if (isElevenCharacterLong) {
      const additionalHint = isCheckDigitValid(code) 
        ? 'Leading zero might have been deleted'
        : 'The check digit is wrong';
      reasons.push(additionalHint);
    }

    if(!isCheckDigitValid(code)) {
      reasons.push('Unvalid UPC-A code. Check for mispell.')
    }
  }
  
  const isValid = !isNaN(code) && isTwelveCharacterLong && isCheckDigitValid(code);

  return isValid || reasons;
}