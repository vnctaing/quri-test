export default function removeEveryWhiteSpace(str) {
  if(typeof str === 'number') return str.toString();
  return str.replace(/ /g,'');
}