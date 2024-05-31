import DoubleANdThriple from "./DoubleANdThriple";
import OddAndEven from "./OddAndEven";
import uuid from 'react-native-uuid';

export default function GuessUnitllMatch(setGuessNth, sortedDicenumber,) {
  let Guess = []
  let NthNotFound = true;
  let i = 0

  while (NthNotFound === true) {

    i = i + 1;
    let Threedices = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ];


    let match = true;
    for (let j = 0, len = sortedDicenumber.length; j < len; j++) {
      if (Threedices[j] !== sortedDicenumber[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      Guess.push({
        key: uuid.v4(),
        count: i,
        value: Threedices,
        message: DoubleANdThriple(Threedices[0], Threedices[1], Threedices[2]) + ' ' + OddAndEven(Threedices[0], Threedices[1], Threedices[2]) + "  ***Match***"
      });
      break;
    } else {
      Guess.push({
        key: uuid.v4(),
        count: i,
        value: Threedices,
        message: DoubleANdThriple(Threedices[0], Threedices[1], Threedices[2]) + ' ' + OddAndEven(Threedices[0], Threedices[1], Threedices[2])
      });
    }

    /* console.log(Guess) */
  }

  setGuessNth(Guess)
}
