import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";

//images
import logo from "../images/logo.png";
import weatherapiLogo from "../images/weatherapiLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home({ navigation }) {
  const [data, setdata] = useState(null);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_500Medium,
  });

  //   if (!fontsLoaded && !fontError) {
  //     return null;
  //   }
  useEffect(() => {
    const getData = async () => {
      let x = await AsyncStorage.getItem("Pop");
      console.log(x);
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text> Home </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Display")}>
        <Text>Go to Displays</Text>
      </TouchableOpacity> */}
      <View style={{ flex: 1, backgroundColor: "#333238" }}>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Weather App
        </Text>
        {/* Body */}
        <View>
          <Text style={styles.text}>This app is made using WeatherAPI.com</Text>
          <Text style={styles.text}>
            WeatherAPI.com makes it super easy to integrate our realtime, daily,
            hourly and 15 min interval weather forecast data, historical
            weather, marine weather, bulk request, air quality data,
            autocomplete, time zone, astronomy and sports data into your new or
            existing project.
          </Text>
          <View>
            <Image
              source={weatherapiLogo}
              style={{
                height: 80,
                resizeMode: "contain",
                backgroundColor: "white",
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
});
