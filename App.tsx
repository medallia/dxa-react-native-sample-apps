/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {MedalliaDXA, MedalliaDxaCustomerConsentType} from './node_modules/dxa-react-native/src/index';
import crashlytics from '@react-native-firebase/crashlytics';

const Stack = createNativeStackNavigator();


const App = () => {
  crashlytics().log('User signed in.');

  const navigationRef = useNavigationContainerRef();
  MedalliaDXA.initialize(
    {
      accountId: 10010,
      propertyId: 250441,
      consents: MedalliaDxaCustomerConsentType.recordingAndTracking,
      manualTracking: false,
    },
    navigationRef
  ).then(() => {
    console.log('MedalliaDXA initialized');
  
  }
  );
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ title: 'Screen1' }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ title: 'Screen2' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



function Screen1({ navigation }: { navigation: any }) {
  return (
    <View>
      <ScrollView>


        <Button
          title='Go to Screen 1'
          onPress={() => navigation.push('Screen2')} />
        <Button
          title='crash with crashlytics'
          onPress={() => crashlytics().crash()} />
        <Button
          title='crash with sdk'
          onPress={() => MedalliaDXA.sendHttpError(22)} />

      </ScrollView>
    </View>
  );
}
function Screen2({ navigation }: { navigation: any }) {
  return (
    <View>
      <ScrollView>


        <Button
          title='Go to Screen 2'
          onPress={() => navigation.push('Screen1')} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
