import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TextInput } from "react-native";
import apiKeys from "../constants/apiKey";
import { SafeAreaView } from "react-native-safe-area-context";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setcity] = useState("");
  //const { temp, humidity, weather } = weatherData.main;
  //const icon = weather[0].icon;

  const fetchWeatherData = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys.apiKeyWeather}`
      )
      .then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //if (!weatherData.main) return <Text>Loading...</Text>;

  return (
    <SafeAreaView>
      <TextInput
        inputMode="text"
        keyboardType="ascii-capable"
        onChangeText={(text) => setcity(text)}
        value={city}
        style={{ backgroundColor: "pink", fontSize: 20 }}
        onSubmitEditing={() => fetchWeatherData()}
        onFocus={() => setWeatherData(null)}
      />
      {weatherData != null ? (
        <View>
          <Text>{city}</Text>
          <Text>{Math.round(weatherData.main.temp)}°C</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default WeatherApp;
