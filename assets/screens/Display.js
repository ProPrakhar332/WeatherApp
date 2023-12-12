import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export function Display({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text> Home </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Display")}>
        <Text>Go to Displays</Text>
      </TouchableOpacity> */}

      <View
        style={{ flex: 1, backgroundColor: "#333238", flexDirection: "column" }}
      >
        <Text> Display </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Display;
