import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Notes from './Notes';



const Main = () => {
  const [addNotes, setAddNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // add a plan
  const addPlan = useCallback(() => {
    if (inputValue.length) {
      const d = new Date();
      const payload = {
        date: `${d.getDate()} / ${d.getMonth()}/${d.getFullYear()}`,
        note: inputValue
      }
      setAddNotes([payload, ...addNotes]);
      setInputValue('');
    }
  }, [addNotes, inputValue]);


  // Delete complete plan
  const deletePlan = useCallback((i) => () => {
    addNotes.splice(i, 1);
    setAddNotes([...addNotes])
  }, [addNotes]);


  return (

    < View style={styles.container} >

      <View style={styles.header}>
        <Text style={styles.headerText}>My Next Plan</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {
          addNotes.map((item, i) => (<Notes key={i} data={item} deletePlan={deletePlan(i)}></Notes>))
        }
      </ScrollView>

      {/* PlaceHolder for get user data */}
      <View style={styles.footer}>
        <TextInput
          onChangeText={(userInput) => setInputValue(userInput)}
          value={inputValue}
          style={styles.textInput} placeholder="Note Your Next Plan..."
          placeholderTextColor="#eee" underlineColorAndroid="transparent"
        >
        </TextInput>
      </View>

      {/* TouchableOpacity for user add button */}
      <TouchableOpacity onPress={addPlan} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View >
  )

};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#D3FBFC"
  },
  header: {
    backgroundColor: 'crimson',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "crimson",
    paddingTop: 20
  },
  headerText: {
    color: "white",
    fontSize: 35,
    padding: 25,
    fontWeight: "700"
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: "stretch",
    color: "white",
    padding: 20,
    backgroundColor: "black",
    borderTopWidth: 2,
    borderTopColor: "#ededed",
    fontSize: 25,
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 100,
    backgroundColor: "#F1C40F",
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  addButtonText: {
    color: "#ff0700",
    // color: "black",
    fontSize: 46,
    fontWeight: "900"
  },


});


export default Main;
