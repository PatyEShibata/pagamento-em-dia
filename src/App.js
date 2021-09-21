import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AgendaContasPagar from './Paginas/AgendaContasPagar';
import Cadastro from './Paginas/Cadastro';
import PagarEditar from './Paginas/PagarEditar';
import Editar from './Paginas/Editar';
import Pagar from './Paginas/Pagar';

const Stack = createStackNavigator();

export default props => {
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AgendaContasPagar"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="AgendaContasPagar"
          component={AgendaContasPagar}
          options={({ route }) => {
            return {
              title: `Contas do mês de ${route.params?.title}` 
            }
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            title: "Cadastro de título"
          }}
        />
        <Stack.Screen
          name="Pagar"
          component={Pagar}
          options={{
            title: "Pagar"
          }}
        />
        <Stack.Screen
          name="Editar"
          component={Editar}
          options={{
            title: "Editar"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const screenOptions = {
  headerStyle:{
    backgroundColor: '#C7E9C2',
    height: 100,
    borderBottomRightRadius: 32,
  },
  // headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'RobotoBold',
    // fontWeight: 'bold'
  }
}

