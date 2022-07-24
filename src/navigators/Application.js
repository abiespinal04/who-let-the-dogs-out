import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './Main';
import {navigationRef} from './utils';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
