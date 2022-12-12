export function shuffle(theArray: Array<any>): Array<any> {
  let currentIndex: number = theArray.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [theArray[currentIndex], theArray[randomIndex]] = [
      theArray[randomIndex],
      theArray[currentIndex],
    ];
  }

  return theArray;
}
