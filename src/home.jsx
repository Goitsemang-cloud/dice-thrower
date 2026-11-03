import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Diplay from './components/diplay'
import Dice from './components/Dice';
import List from './components/list';
import Guessnth from './components/guessnth';
import Button from './components/Button';
import Sheet from './components/Sheet';
import { useTheme, type, haptic } from './theme';

import GuessUnitllMatch from './functions/guessUnitllMatch';
import ThrowDice from './functions/throwDice';

export default function Home() {
  const theme = useTheme();
  const [diceNumber, setDiceNumber] = useState([0, 0, 0]);
  const [sortedDicenumber, setSortedDicenumber] = useState([0, 0, 0]);
  const [rollId, setRollId] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [optionShowModel, setOptionShowModel] = useState(false);
  const [guessNth, setGuessNth] = useState([]);

  const rolled = diceNumber[0] !== 0;
  const canGuess = rolled && !rolling;

  const throwDice = () => {
    haptic.impact();
    ThrowDice(setDiceNumber, setSortedDicenumber);
    setRolling(true);
    setRollId((id) => id + 1);
  };

  const guessUntilMatch = () => {
    GuessUnitllMatch(setGuessNth, sortedDicenumber);
    haptic.success();
    setOptionShowModel(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>

      <View style={styles.header}>
        <Text style={[type.largeTitle, { color: theme.label }]} accessibilityRole="header">Dice Thrower</Text>
        <Text style={[type.subheadline, { color: theme.secondaryLabel }]}>
          Roll three dice, then see how long chance takes to land them again in order.
        </Text>
      </View>

      <View style={styles.stage}>
        <Dice diceNumber={diceNumber} rollId={rollId} onSettled={() => setRolling(false)} />
        <Diplay diceNumber={diceNumber} sortedDicenumber={sortedDicenumber} rolling={rolling} />
      </View>

      <View style={styles.actions}>
        <Button title={rolling ? 'Rolling…' : 'Roll Dice'} onPress={throwDice} disabled={rolling} />
        <View style={styles.row}>
          <Button title="Guess Nth" variant="tinted" style={styles.flex} disabled={!canGuess}
            onPress={() => { haptic.light(); setShowModel(true); }} />
          <Button title="Until Match" variant="tinted" style={styles.flex} disabled={!canGuess}
            onPress={guessUntilMatch} />
        </View>
        {!rolled && (
          <Text style={[type.footnote, styles.hint, { color: theme.secondaryLabel }]}>
            Roll the dice to unlock guessing.
          </Text>
        )}
      </View>

      <Sheet visible={showModel} title="Guess Nth Roll" onClose={() => setShowModel(false)}>
        <Guessnth guessNth={guessNth} setGuessNth={setGuessNth} sortedDicenumber={sortedDicenumber} />
      </Sheet>

      <Sheet visible={optionShowModel} title="Roll Until Match" onClose={() => setOptionShowModel(false)}>
        <List guessNth={guessNth} target={sortedDicenumber} />
      </Sheet>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 12,
    gap: 4,
  },
  stage: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    gap: 12,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  hint: {
    textAlign: 'center',
  },
});
