import removeEveryWhiteSpace from './removeEveryWhiteSpace'

export default function isCheckDigitValid(code) {
  code = removeEveryWhiteSpace(code);

  const bodyCode = code.slice(0,code.length - 1);
  const digitCheck = parseInt(code.slice(code.length - 1,code.length), 10);
  
  // Opposite of Wikipedia's `odd` definition
  const sumOfOddNumberedPosition = getSumOf(bodyCode, 'odd');
  const sumOfEvenNumberedPosition = getSumOf(bodyCode, 'even');

  const res = (((sumOfEvenNumberedPosition * 3) + sumOfOddNumberedPosition) % 10) !== 0 
              ? 10 - (((sumOfEvenNumberedPosition * 3) + sumOfOddNumberedPosition) % 10)
              : ((sumOfEvenNumberedPosition * 3) + sumOfOddNumberedPosition) % 10


  function getSumOf(arr, param) {
    return arr.split('')
                  .map((s) => parseInt(s, 10))
                  .reduce((acc, n, i) => {
                    if (param === 'odd' ? i % 2 === 1 : i % 2 === 0) {
                      acc += n;
                    }
                    return acc;
                  }, 0)
  }
                
  return digitCheck === res;
}