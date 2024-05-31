import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Diplay from './components/diplay'
import Dice from './components/Dice';
import List from './components/list';
import Guessnth from './components/guessnth';

import GuessUnitllMatch from './functions/guessUnitllMatch';
import ThrowDice from './functions/throwDice';

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

export default function Home() {
  const [diceNumber, setDiceNumber] = useState([0, 0, 0]);
  const [sortedDicenumber, setSortedDicenumber] = useState([0, 0, 0]);
  const [showModel, setShowModel] = useState(false);
  const [optionShowModel, setOptionShowModel] = useState(false);
  const [guessNth, setGuessNth] = useState([]);
  const [userInput, setUserInput] = useState(0);
  const [submit, setSubmit] = useState(false)

  return (
    <View style={styles.container}>

      {/* Display Section */}
      <Diplay
        diceNumber={diceNumber}
        sortedDicenumber={sortedDicenumber}
      />

      {/* Dice section */}
      <Dice
        diceNumber={diceNumber}
      />
      <>
        {
          optionShowModel
            ?
            <List
              setOptionShowModel={setOptionShowModel}
              guessNth={guessNth}
              hasClose={true}
            />
            :
            showModel
              ?
              <Guessnth
                guessNth={guessNth}
                userInput={userInput}
                setUserInput={setUserInput}
                submit={submit}
                setSubmit={setSubmit}
                setShowModel={setShowModel}
                setOptionShowModel={setOptionShowModel}
                setGuessNth={setGuessNth}
                sortedDicenumber={sortedDicenumber}
              />
              :
              /* button */
              <View style={styles.btnContainer}>

                <TouchableOpacity style={styles.btn} onPress={() => ThrowDice(setDiceNumber, setSortedDicenumber)}>
                  <Text>throw Dice</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, diceNumber[0] == 0 ? styles.conditionalColor : '']} disabled={diceNumber[0] == 0}
                  onPress={() => [setShowModel(true), setUserInput(0)]}>
                  <Text>Guess Nth Term</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, diceNumber[0] == 0 ? styles.conditionalColor : '']} disabled={diceNumber[0] == 0}
                  onPress={() => [setOptionShowModel(true), GuessUnitllMatch(setGuessNth, sortedDicenumber)]}>
                  <Text>Guess Until Match</Text>
                </TouchableOpacity>

              </View>
        }
      </>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#6CC1EB',
    width: devicewidth * .7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  InputContainer: {
    width: devicewidth * .7,
    height: deviceheight * .1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  conditionalColor: {
    backgroundColor: '#E6E6E6'
  }
});
