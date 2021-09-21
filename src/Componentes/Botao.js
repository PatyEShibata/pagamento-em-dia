import React from 'react';
import { Button } from 'react-native-elements';

const BotaoPreenchido = props => {
  const { label, onPressButton, isPreenchido, widthFixo } = props;

  return(
    <Button
      {...props}
      onPress={onPressButton}
      title={label}
      buttonStyle={[ styles.button,  !isPreenchido && styles.buttonNaoPreenchido, widthFixo && styles.buttonWidthFixo]}
      type={isPreenchido ? "solid" : "outline"}
    />
  )
};
    
  const styles = {
    button:{
      backgroundColor: "#37872A",
      color: "#fff",
      borderBottomRightRadius: 32,
      borderTopRightRadius: 32,
      borderTopLeftRadius: 32,
      borderBottomLeftRadius: 32,
      height: 55,
      marginBottom: 20
    },
    buttonWidthFixo:{
      width: 200
    },
    buttonNaoPreenchido:{
      color: "#37872A",
      borderColor: "#37872A",
      borderWidth: 2,
      backgroundColor: "transparent",
    },
  }

export default BotaoPreenchido;