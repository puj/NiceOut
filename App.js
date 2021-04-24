import React from 'react';
import { Text, View } from 'react-native';
import Constants from 'expo-constants';
const API_KEY = Constants.manifest.extra.API_KEY;

const App = () => {
  console.log('asDF:LASDJFLKASDF');
  return (
    <View>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
      <Text>API:{API_KEY}</Text>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={Home} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default App;
