import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import login from './pages/login/login'
import home from './pages/home/home'
import operacao from './pages/home/operacao/operacao'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={login} /> */}
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Operação" component={operacao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;