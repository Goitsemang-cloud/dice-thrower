import { StyleSheet, Text, View } from 'react-native';
import { useTheme, type } from '../theme';
import FadeIn from './FadeIn';
import DoubleANdThriple from '../functions/DoubleANdThriple';
import OddAndEven from '../functions/OddAndEven';

function Row({ label, value, last }) {
  const theme = useTheme();
  return (
    <View style={[styles.row, !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.separator }]}>
      <Text style={[type.body, { color: theme.label }]}>{label}</Text>
      <Text style={[type.body, styles.value, { color: theme.secondaryLabel }]}>{value}</Text>
    </View>
  );
}

export default function Diplay({ diceNumber, sortedDicenumber, rolling }) {
  const theme = useTheme();
  const rolled = diceNumber[0] !== 0;
  const pattern = [DoubleANdThriple(...diceNumber), OddAndEven(...diceNumber)].filter(Boolean).join(' · ');

  const show = (text) => (rolling ? 'Rolling…' : rolled ? text : '—');

  return (
    <View style={styles.section}>
      <Text style={[type.footnote, styles.header, { color: theme.secondaryLabel }]}>RESULT</Text>
      <FadeIn trigger={rolling} style={[styles.card, { backgroundColor: theme.card }]}>
        <Row label="Thrown" value={show(diceNumber.join(' · '))} />
        <Row label="Sorted" value={show(sortedDicenumber.join(' · '))} />
        <Row label="Pattern" value={show(pattern || 'None')} last />
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    alignSelf: 'stretch',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  card: {
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingLeft: 16,
  },
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  value: {
    fontVariant: ['tabular-nums'],
  },
});
