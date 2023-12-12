import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./assets/screens/Home";
import Display from "./assets/screens/Display";
import OpenWeather from "./assets/screens/OpenWeather";
import Landing from "./assets/screens/Landing";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Display"
          options={{ headerShown: false }}
          component={Display}
        />
        <Stack.Screen
          name="OpenWeather"
          options={{ headerShown: false }}
          component={OpenWeather}
        />
        <Stack.Screen
          name="Landing"
          options={{ headerShown: false }}
          component={Landing}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
