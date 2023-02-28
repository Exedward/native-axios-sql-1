import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Vibration, KeyboardAvoidingView } from 'react-native';
import api from './src/services/api';

export default function App() {

  var pat = [500, 300, 200]

  const [frase, setFrase] = useState('')
  const [valorInput, setValorInput] = useState('')

  var timer 

  async function consultar(){
    const {data}  = await api.get('/')
    setFrase(data.nome)
    console.log(data.nome)
    if(data.nome == 'silva'){
      clearInterval(timer)
      Vibration.vibrate(pat, true)  
    }
    setValorInput('')
  }

  async function setar(){
    
    if(valorInput != ''){
      await api.post('/insert', {'nome': valorInput}).then(() => {
        Alert.alert('AVISO', 'Valor inserido com sucesso!')
      })
      setValorInput('')
    }
    else{
      Alert.alert('ERRO', 'Entrada de texto vazia. Escreva algo.')
      Vibration.cancel()
      timer = setInterval(consultar, 5000)
    }
  }

  return (
    <KeyboardAvoidingView behavior='height' enabled={true} style={styles.container}>
      <Text style={styles.textTituloApp}>Teste De API</Text>
      <View style={styles.container2}>
        <TextInput 
          style={styles.textEntrada}
          placeholder='Frase aqui'
          textAlign='center'
          onChangeText={setValorInput}
          editable={true}
          value={valorInput}
          cursorColor='#000'
          keyboard
        />
        <TouchableOpacity 
          style={styles.touch}
          onPress={consultar}
        >
        <Text style={styles.textButton}>CONSULTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.touch}
          onPress={setar}
        >
        <Text style={styles.textButton}>SETAR</Text>
        </TouchableOpacity>
        <Text style={styles.textTituloFrase}>Frase Configurada:</Text>
        <Text style={styles.textFrase}>{frase}</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0'
  },
  container2:{
    width: '85%',
    height: '70%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDD'
  },
  touch:{
    backgroundColor: 'red',
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 20,
  },
  textButton:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  textFrase:{
    fontSize: 17,
    marginTop: 50,
  },
  textEntrada:{
    width: '80%',
    borderWidth: 1,
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
    marginBottom: 30,
  },
  textTituloFrase:{
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 18
  },
  textTituloApp:{
    fontSize: 30,
    marginBottom: 40,
  }
});
