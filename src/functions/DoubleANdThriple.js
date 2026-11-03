export default function DoubleANdThriple(value1, value2, value3) {
  if (value1 === value2 && value2 === value3) return 'Triple';
  if (value1 === value2 || value1 === value3 || value2 === value3) return 'Double';
  return '';
}
