import { VirtualizedList, StyleSheet, Text, View } from 'react-native';
import { useTheme, type } from '../theme';
import { DieFace } from './Dice';
import FadeIn from './FadeIn';
import Button from './Button';

function Pill({ label, color, background }) {
  return <Text style={[type.caption, styles.pill, { color, backgroundColor: background }]}>{label}</Text>;
}

function Summary({ guessNth, target }) {
  const theme = useTheme();
  const match = guessNth.find((item) => item.match);

  return (
    <View style={[styles.summary, { backgroundColor: theme.card }]}>
      <Text style={[type.footnote, { color: theme.secondaryLabel }]}>
        {match ? 'MATCHED ON ROLL' : 'NO MATCH IN'}
      </Text>
      <Text style={[styles.bigNumber, { color: match ? theme.green : theme.label }]}>
        {(match ? match.count : guessNth.length).toLocaleString()}
      </Text>
      {!match && <Text style={[type.subheadline, { color: theme.secondaryLabel }]}>rolls</Text>}
      <View style={styles.targetDice}>
        {target.map((value, i) => <DieFace key={i} value={value} size={28} />)}
      </View>
      <Text style={[type.footnote, { color: theme.secondaryLabel }]}>Target, in order</Text>
    </View>
  );
}

export default function List({ guessNth, target, onRetry }) {
  const theme = useTheme();
  const last = guessNth.length - 1;

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.row,
        { backgroundColor: item.match ? theme.greenFill : theme.card },
        index === 0 && styles.first,
        index === last && styles.last,
        index !== last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.separator },
      ]}
    >
      <Text style={[type.subheadline, styles.count, { color: theme.secondaryLabel }]}>#{item.count}</Text>
      <View style={styles.dice}>
        {item.value.map((value, i) => <DieFace key={i} value={value} size={22} />)}
      </View>
      <View style={styles.tags}>
        {item.tags.map((tag) => <Pill key={tag} label={tag} color={theme.secondaryLabel} background={theme.fill} />)}
        {item.match && <Pill label="Match" color="#FFFFFF" background={theme.green} />}
      </View>
    </View>
  );

  return (
    <FadeIn trigger={guessNth} offset={16} style={styles.container}>
      <VirtualizedList
        data={guessNth}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Summary guessNth={guessNth} target={target} />
            <Text style={[type.footnote, styles.header, { color: theme.secondaryLabel }]}>ROLLS</Text>
          </>
        }
        ListFooterComponent={onRetry && <Button title="Try Another Number" variant="tinted" onPress={onRetry} style={styles.retry} />}
      />
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  summary: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 24,
    borderRadius: 16,
    borderCurve: 'continuous',
    marginTop: 8,
    marginBottom: 28,
  },
  bigNumber: {
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  targetDice: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 2,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  first: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  last: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  count: {
    width: 52,
    fontVariant: ['tabular-nums'],
  },
  dice: {
    flexDirection: 'row',
    gap: 4,
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 4,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  retry: {
    marginTop: 24,
  },
});
