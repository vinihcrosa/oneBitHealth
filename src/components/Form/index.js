import React, { useState } from 'react';
import {
  Keyboard,
  Pressable,
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Vibration,
  FlatList
} from 'react-native';

import ResultIMC from './ResultImc'

import styles from './style'

export default function Form() {
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageImc, setMessageImc] = useState('preencha o peso e a altura')
  const [imc, setImc] = useState()
  const [textButton, setTextButton] = useState('Calcular')
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  function imcCalculator(){
    let heightFormat = height.replace(',', '.')
    const imcTotal = (weight/(heightFormat*heightFormat)).toFixed(2)
    
    setImcList((arr) => [...arr, {id: new Date().getTime(), imc: imcTotal}])
    setImc(imcTotal)
    return imcTotal
  }

  function verificationImc(){
    if(imc == null){
      Vibration.vibrate()
      setErrorMessage('Campo obrigatório')
    }
  }


  function validationImc(){
    console.log(imcList)
    if(weight != null && height != null){
      imcCalculator()
      setMessageImc("Seu imc é igual: ")
      setTextButton("Calcular novamente")
      setHeight(null)
      setWeight(null)
      setErrorMessage(null)
    }else{
      verificationImc()
      setImc(null)
      setTextButton("Calcular")
      setMessageImc("preencha o peso e a altura")
    }
  }

  return (
    
    <View style={styles.formContext}>
      {imc == null?
      <Pressable
        style={styles.form}
        onPress={Keyboard.dismiss}
      >
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric" 
        />

        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text 
            style={styles.textButtonCalculator}
          >
            {textButton}
          </Text>
        </TouchableOpacity>
        </Pressable>
      :
      <View style={styles.exhibitionResult}>
        <ResultIMC messageResultImc={messageImc} resultImc={imc}/>
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validationImc()}
        >
          <Text 
            style={styles.textButtonCalculator}
          >
            {textButton}
          </Text>
        </TouchableOpacity>
      </View>
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({item}) => {
          return(
            <Text style={styles.resultImcItem}>
              Resultado IMC = 
            <Text style={styles.textResultItemList}>{item.imc}</Text>
            </Text>
          )
        }}
        keyExtractor={(item) => {item.id}}
      >

      </FlatList>
    </View>
  );
}