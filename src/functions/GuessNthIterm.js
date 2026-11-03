import DoubleANdThriple from './DoubleANdThriple';
import OddAndEven from './OddAndEven';
import { rollThree } from './throwDice';

// Rolls up to `nth` times, stopping early when a roll matches the target in order
export default function GuessNthIterm(nth, setGuessNth, sortedDicenumber) {
  const Guess = [];

  for (let count = 1; count <= nth; count++) {
    const value = rollThree();
    const match = value.every((die, i) => die === sortedDicenumber[i]);

    Guess.push({
      key: String(count),
      count,
      value,
      tags: [DoubleANdThriple(...value), OddAndEven(...value)].filter(Boolean),
      match,
    });

    if (match) break;
  }

  setGuessNth(Guess);
  return Guess;
}
