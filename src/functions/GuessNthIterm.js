import DoubleANdThriple from "./DoubleANdThriple";
import OddAndEven from "./OddAndEven";
import uuid from 'react-native-uuid';

export default function GuessNthIterm(nth, setGuessNth, setShowModel, sortedDicenumber) {
  let Guess = []

  for (let i = 1; i <= nth; i++) {

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
  }

  setGuessNth(Guess)
  setShowModel(true)
}


/* to be fixed soon */