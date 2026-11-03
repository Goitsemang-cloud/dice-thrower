export default function OddAndEven(...values) {
  if (values.every((value) => value % 2 === 0)) return 'All Even';
  if (values.every((value) => value % 2 !== 0)) return 'All Odd';
  return '';
}
