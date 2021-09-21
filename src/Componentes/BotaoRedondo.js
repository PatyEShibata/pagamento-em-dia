import React from 'react';
import { Button } from 'react-native-elements';

const BotaoRedondo = props => {
  const { label, onPressButton } = props;

  return(
    <Button
      {...props}
      onPress={onPressButton}
      title={label}
      buttonStyle={styles.button}
      type={"solid"}
    />
  )
};
    
  const styles = {
    button:{
      backgroundColor: "#37872A",
      borderBottomRightRadius: 32,
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
      borderBottomLeftRadius: 32,
      height: 55,
      width: 55,
      marginBottom: 20,
      marginHorizontal: 20

    },
  }

export default BotaoRedondo;