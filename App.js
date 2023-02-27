import React,{ useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import api from './src/services/api';

export default function App() {

  const [frase, setFrase] = useState('')
  const [valorInput, setValorInput] = useState('Ola')

  async function consultar(){

    const {data}  = await api.get('/')
    setFrase(data.nome)
    console.log(data.nome)
    valorInput=null
  }

  async function setar(){
    await api.post('/insert', {'nome': 'Eduardo'})
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textEntrada}
        placeholder='Frase aqui'
        textAlign='center'
        onChangeText={setValorInput}
        editable={true}
        value={valorInput}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa'
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
  }
});
