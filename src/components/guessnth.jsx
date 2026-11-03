import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme, type, haptic } from '../theme';
import List from './list';
import Button from './Button';
import GuessNthIterm from '../functions/GuessNthIterm';

// Keeps the JS thread responsive; the simulation runs synchronously
const MAX_ROLLS = 10000;

export default function Guessnth({ guessNth, setGuessNth, sortedDicenumber }) {
  const theme = useTheme();
  const [userInput, setUserInput] = useState('');
  const [submit, setSubmit] = useState(false);

  const rolls = parseInt(userInput, 10);
  const valid = rolls > 0 && rolls <= MAX_ROLLS;

  const guess = () => {
    if (!valid) return;
    const results = GuessNthIterm(rolls, setGuessNth, sortedDicenumber);
    results.some((item) => item.match) ? haptic.success() : haptic.warning();
    setSubmit(true);
  };

  if (submit) {
    return <List guessNth={guessNth} target={sortedDicenumber} onRetry={() => setSubmit(false)} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={[type.footnote, styles.header, { color: theme.secondaryLabel }]}>NUMBER OF ROLLS</Text>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <TextInput
          style={[type.body, styles.input, { color: theme.label }]}
          onChangeText={(text) => setUserInput(text.replace(/[^0-9]/g, ''))}
          value={userInput}
          placeholder="e.g. 100"
          placeholderTextColor={theme.tertiaryLabel}
          keyboardType="number-pad"
          returnKeyType="go"
          onSubmitEditing={guess}
          autoFocus
        />
      </View>
      <Text style={[type.footnote, styles.footer, { color: theme.secondaryLabel }]}>
        Rolls three dice up to this many times and stops early if they land as {sortedDicenumber.join(' · ')}.
        Up to {MAX_ROLLS.toLocaleString()} rolls.
      </Text>

      <Button title="Roll" onPress={guess} disabled={!valid} style={styles.button} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  card: {
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
  },
  input: {
    minHeight: 44,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  button: {
    marginTop: 28,
  },
});
