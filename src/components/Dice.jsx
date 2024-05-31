import { Image } from 'expo-image';
import { StyleSheet, View, Dimensions } from 'react-native';


const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

const diceImages = {
  0: require('../../assets/0.png'),
  1: require('../../assets/1.png'),
  2: require('../../assets/2.png'),
  3: require('../../assets/3.png'),
  4: require('../../assets/4.png'),
  5: require('../../assets/5.png'),
  6: require('../../assets/6.png')
};

export default function Dice({ diceNumber }) {
  return (
    <View style={styles.diceContainer}>

      <View style={styles.dice}>
        <Image
          style={styles.image}
          source={diceImages[diceNumber[0] !== 0 ? diceNumber[0] : 0]}
        />
      </View>

      <View style={styles.dice}>
        <Image
          style={styles.image}
          source={diceImages[diceNumber[1] !== 0 ? diceNumber[1] : 0]}
        />
      </View>

      <View style={styles.dice}>
        <Image
          style={styles.image}
          source={diceImages[diceNumber[2] !== 0 ? diceNumber[2] : 0]}
        />
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  diceContainer: {
    flexDirection: 'row',
    marginVertical: 15
  },
  dice: {
    width: devicewidth * .2,
    height: deviceheight * .1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 5,
    marginHorizontal: 11
  },
  image: {
    width: 75,
    height: 75,
  }
});
