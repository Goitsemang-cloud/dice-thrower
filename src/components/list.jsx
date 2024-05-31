import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const devicewidth = Dimensions.get('window').width;
const deviceheight = Dimensions.get('window').height;

export default function List({ setOptionShowModel, guessNth, hasClose }) {
  return (
    <>
      <View style={{ flex: .5, width: devicewidth * .7, }}>
        <FlatList
          data={guessNth}
          renderItem={({ item }) => <Text style={{ fontSize: 16, fontWeight: 500 }}>{item.count}: {item.value}   {item.message}</Text>}
        />
      </View>
      {hasClose ?
        <>
          <TouchableOpacity style={styles.btn}
            onPress={() => [setOptionShowModel(false)]}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </>
        :
        <></>
      }

    </>
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