import React from 'react';
import { View, Text } from 'react-native';

const InformePagarPago = props => {
  const { label, color } = props;

  return(
    <View style={{
      backgroundColor: color,
      width: 50,
      height: 25,
      paddingBottom: 4,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
      }}>
      <Text style={styles.text}> { label } </Text>
    </View>
  )
};

const styles = {
  text:{
    color: '#fff',
  }
};

export default InformePagarPago;