import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screen';
import DogDetails from '../screen/Home/DogDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DogStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
    <Stack.Group>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DogDetails" component={DogDetails} />
    </Stack.Group>
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dogs House"
        component={DogStack}
        options={{
          headerShown: false,
          tabBarIconStyle: {display: 'none'},
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
