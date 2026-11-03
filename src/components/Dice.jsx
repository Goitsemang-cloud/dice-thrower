import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useTheme, haptic } from '../theme';

// Pip positions on a 3x3 grid (0 = top-left, 8 = bottom-right)
const PIPS = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

export function DieFace({ value, size }) {
  const theme = useTheme();
  const small = size < 40;
  const pip = size * 0.17;
  const pad = size * 0.24;
  const step = (size - pad * 2) / 2;

  return (
    <View
      style={[
        styles.face,
        {
          width: size,
          height: size,
          borderRadius: size * 0.24,
          backgroundColor: theme.die,
          boxShadow: small ? undefined : '0 8px 20px rgba(0, 0, 0, 0.12)',
          borderWidth: small ? StyleSheet.hairlineWidth : 0,
          borderColor: theme.separator,
        },
      ]}
    >
      {value ? (
        PIPS[value].map((i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: pip,
              height: pip,
              borderRadius: pip / 2,
              backgroundColor: theme.pip,
              left: pad + (i % 3) * step - pip / 2,
              top: pad + Math.floor(i / 3) * step - pip / 2,
            }}
          />
        ))
      ) : (
        <Text style={{ fontSize: size * 0.42, fontWeight: '600', color: theme.tertiaryLabel }}>?</Text>
      )}
    </View>
  );
}

function useReduceMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => sub.remove();
  }, []);

  return reduceMotion;
}

function RollingDie({ value, rollId, index, size, onSettled }) {
  const reduceMotion = useReduceMotion();
  const [face, setFace] = useState(value);
  const spin = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!rollId) return;

    if (reduceMotion) {
      setFace(value);
      onSettled?.();
      return;
    }

    // Each die lands a little after the one before it
    const duration = 520 + index * 140;
    const flicker = setInterval(() => setFace(Math.floor(Math.random() * 6) + 1), 70);

    spin.setValue(0);
    Animated.parallel([
      Animated.timing(spin, { toValue: 1, duration, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(lift, { toValue: -size * 0.35, duration: duration * 0.4, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.spring(lift, { toValue: 0, friction: 4, tension: 140, useNativeDriver: true }),
      ]),
    ]).start();

    const settle = setTimeout(() => {
      clearInterval(flicker);
      setFace(value);
      scale.setValue(0.88);
      Animated.spring(scale, { toValue: 1, friction: 3, tension: 220, useNativeDriver: true }).start();
      haptic.light();
      onSettled?.();
    }, duration);

    return () => {
      clearInterval(flicker);
      clearTimeout(settle);
    };
  }, [rollId]);

  const direction = index % 2 === 0 ? 1 : -1;
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${direction * 360}deg`] });

  return (
    <Animated.View style={{ transform: [{ translateY: lift }, { rotate }, { scale }] }}>
      <DieFace value={face} size={size} />
    </Animated.View>
  );
}

export default function Dice({ diceNumber, rollId, onSettled }) {
  const { width } = useWindowDimensions();
  const size = Math.min(96, (width - 40 - 40) / 3);

  return (
    <View style={styles.diceContainer} accessible accessibilityLabel={diceNumber[0] ? `Dice show ${diceNumber.join(', ')}` : 'Dice not rolled yet'}>
      {diceNumber.map((value, index) => (
        <RollingDie
          key={index}
          value={value}
          rollId={rollId}
          index={index}
          size={size}
          onSettled={index === diceNumber.length - 1 ? onSettled : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 32,
  },
  face: {
    borderCurve: 'continuous',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
