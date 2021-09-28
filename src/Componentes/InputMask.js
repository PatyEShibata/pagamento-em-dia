import React from 'react';
import {View, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

const InputMask = props => {
  const {title, placeholder, error} = props;

  return (
    <View>
      <Text style={styles.title}> {title} </Text>
      <TextInputMask
        {...props}
        style={[styles.input, error && styles.error]}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = {
  title: {
    marginBottom: 10,
    fontSize: 14,
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
  },
  error: {
    borderColor: 'red',
  },
};

export default InputMask;
