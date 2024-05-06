/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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

import { MedalliaDXA, MedalliaDxaCustomerConsentType } from 'dxa-react-native/src';
import crashlytics from '@react-native-firebase/crashlytics';

const Stack = createNativeStackNavigator();


const App = () => {
  crashlytics().log('User signed in.');

  const navigationRef = useNavigationContainerRef();
  MedalliaDXA.initialize(
    {
      accountId: 0,
      propertyId: 0,
      consents: MedalliaDxaCustomerConsentType.analyticsAndTracking,
      manualTracking: false,
    },
    navigationRef
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
        <Stack.Screen
          name="SessionDataScreen"
          component={SessionDataScreen}
          options={{ title: 'SessionDataScreen' }}
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
          title='Send DXA goal'
          onPress={() => MedalliaDXA.sendGoal('myCustomGoal', 5)} />
        <Button
          title='Go to Screen 2'
          onPress={() => navigation.push('Screen2')} />
        <Button
          title='Go to Session Data Screen'
          onPress={() => navigation.push('SessionDataScreen')} />
      </ScrollView>
    </View>
  );
}
function Screen2({ navigation }: { navigation: any }) {
  return (
    <View>
      <ScrollView>
        <Button
          title='Go to Screen 1'
          onPress={() => navigation.push('Screen1')} />

      </ScrollView>
    </View>
  );
}




export function SessionDataScreen({ navigation }: { navigation: any }) {
  const [sessionUrl, setSessionUrl] = useState<string>("requesting...");
  const [sessionId, setSessionId] = useState<string>("requesting...");
  useEffect(() => {
    MedalliaDXA.getSessionUrl().then((url) => setSessionUrl(url));
    MedalliaDXA.getSessionId().then((id) => setSessionId(id));
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.text}>Session url from native is:</Text>
      <View style={{ height: 20 }}></View>
      <Text style={styles.text}>{sessionUrl}</Text>
      <View style={{ height: 20 }}></View>
      <Text style={styles.text}>Session ID from native is:</Text>
      <View style={{ height: 20 }}></View>
      <Text style={styles.text}>{sessionId}</Text>
      <Button
        title="Go back"
        onPress={() => navigation.pop()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
export default App;
