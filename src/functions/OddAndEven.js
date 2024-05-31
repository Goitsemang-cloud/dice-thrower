/* export default function OddAndEven(value1, value2, value3) {

    if (value1 % 2 == 0 & value2 % 2 == 0 & value3 % 2 == 0) { return 'All Even' }
    else if (value1 % 2 != 0 & value2 % 2 != 0 & value3 % 2 != 0) { return 'All Odd' }
    else { return '' }

} */


export default function OddAndEven(value1, value2, value3) {
    if (value1 % 2 === 0 && value2 % 2 === 0 && value3 % 2 === 0) {
        return 'All Even';
    } else if (value1 % 2 !== 0 && value2 % 2 !== 0 && value3 % 2 !== 0) {
        return 'All Odd';
    } else {
        return '';
    }
}
