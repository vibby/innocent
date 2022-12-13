export function random(theArray: Array<any>): any {
  return theArray[Math.floor(Math.random() * theArray.length)];
}
