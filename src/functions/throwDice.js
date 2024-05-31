export default function ThrowDice(setDiceNumber,setSortedDicenumber) {
    let diceNumbers = []
    
    for (let i = 1; i <= 3; i++) {
      diceNumbers.push(Math.floor(Math.random() * 6)  + 1)
    }
    setDiceNumber(diceNumbers);
    const sortedDiceNumbers = [...diceNumbers].sort((a, b) => a - b);
    setSortedDicenumber(sortedDiceNumbers);

   /*  console.log("Unsorted Dice Numbers: ", diceNumbers);
    console.log("Sorted Dice Numbers: ", sortedDiceNumbers) */
}