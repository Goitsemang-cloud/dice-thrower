export const rollDie = () => Math.floor(Math.random() * 6) + 1;

export const rollThree = () => [rollDie(), rollDie(), rollDie()];

export default function ThrowDice(setDiceNumber, setSortedDicenumber) {
  const diceNumbers = rollThree();
  setDiceNumber(diceNumbers);
  setSortedDicenumber([...diceNumbers].sort((a, b) => a - b));
}
