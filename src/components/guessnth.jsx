import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import List from '../components/list';
import GuessNthIterm from '../functions/GuessNthIterm';

const devicewidth = Dimensions.get('window').width;


export default function Guessnth({ guessNth, userInput, setUserInput, submit, setSubmit, setShowModel, setOptionShowModel, setGuessNth, sortedDicenumber }) {
    return (
        <View>
            {
                submit ?
                    <List
                        setOptionShowModel={setOptionShowModel}
                        guessNth={guessNth}
                        hasClose={false}
                    />
                    :
                    <View style={{ flex: .3, borderWidth: 2, justifyContent: 'center', paddingHorizontal: 16 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUserInput}
                            value={userInput.toString()}
                            placeholder="Enter Guess Nth value"
                            keyboardType="numeric"
                        />
                    </View>
            }

            <TouchableOpacity style={styles.btn}
                onPress={() => [GuessNthIterm(userInput, setGuessNth, setShowModel, sortedDicenumber), setSubmit(true)]}
            >
                <Text>Guess</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}
                onPress={() => [setShowModel(false), setSubmit(false)]}
            >
                <Text>Close</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#6CC1EB',
        width: devicewidth * .7,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    }
});