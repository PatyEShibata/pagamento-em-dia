import React from 'react';
import { View, Text } from 'react-native';

const Input = props => {
  const { title, value, inputValor } = props;

  return(
    <View style={styles.content}>
      <Text style={styles.title}> { title } </Text>
      <View style={styles.input}> 
        { 
          inputValor ?
            <Text> R$ { value } </Text>
            :
            <Text> { value } </Text>
        }
      </View>
    </View>
  )
};

const styles = {
  title:{
    marginBottom: 10,
    fontSize: 14
  },
  input: {
    color: '#747474',
    height: 55,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#C4C4C4', 
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginBottom: 30,
    justifyContent: 'center'
  },
  content: {
    marginTop: 20
  }
};

export default Input;