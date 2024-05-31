import { StyleSheet, Text, View, Dimensions } from 'react-native';
import uuid from 'react-native-uuid';


const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

export default function Diplay({ diceNumber, sortedDicenumber }) {
  return (
    <View style={styles.InputContainer}>
      <Text>
        Dice Thrown : {diceNumber[0] != 0 ? diceNumber : 'dice'}
      </Text>
      <Text>-------------------------------</Text>
      <Text>
        Sorted : {sortedDicenumber[0] != 0 ? sortedDicenumber : 'dice'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  InputContainer: {
    width: devicewidth * .7,
    height: deviceheight * .1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
