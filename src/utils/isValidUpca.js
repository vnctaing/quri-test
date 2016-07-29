export default function _isValidUpca(code) {
  const reasons = [];

  const isADigit = !isNaN(code);
  const isTwelveCharacterLong = code.length === 12;

  if (!isADigit) {
    reasons.push("It isn't a correct number")
  } 
  else if (!isTwelveCharacterLong) {
    reasons.push("It isn't a valid UPC-A code (12 character)")
  }
  
  const isValid = isADigit && isTwelveCharacterLong;

  return isValid || {code, reasons};
}