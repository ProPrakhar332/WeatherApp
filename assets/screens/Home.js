import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import SwipeableFlatList from "react-native-swipeable-list";
import apiKeys from "../constants/apiKey";
//images
import logo from "../images/logo.png";
import weatherapiLogo from "../images/weatherapiLogo.png";

//icons
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import img1 from "../icons/img1.png";
import img2 from "../icons/img2.png";
import img3 from "../icons/img3.png";
import img4 from "../icons/img4.png";

//gif
import loading from "../animated/loading.gif";
import axios from "axios";

export function Home({ navigation }) {
  const [data, setdata] = useState([]);
  const [favouriteCities, setFavouriteCities] = useState([]);
  const [city, setCity] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [CurrentCard, setCurrentCard] = useState([]);
  let [fontsLoaded, fontError] = useFonts({
    Poppins_500Medium,
  });

  const defaultData = [
    {
      id: 4,
      image: img4,
      heading:
        "Add multiple cities to your home screen to view weather stats. And easily remove them by simply sliding left.",
    },
    {
      id: 1,
      image: img1,
      heading:
        "WeatherAPI.com provides current and 14 day weather data, future weather, historical weather and geo data via. REST API in JSON format.",
    },
    {
      id: 2,
      image: img2,
      heading:
        "The API will also provide time zone information, astronomy data and geo location data.",
    },
    {
      id: 3,
      image: img3,
      heading:
        "The weather data is provided in partnership with several data providers, government and metreological agencies.",
    },
  ];

  const asyncData = [
    {
      location: {
        name: "Melbourne Airport",
        region: "Melbourne",
        country: "Australia",
        lat: -37.67,
        lon: 144.84,
        tz_id: "Australia/Melbourne",
        localtime_epoch: 1702372853,
        localtime: "2023-12-12 20:20",
      },
      current: {
        last_updated_epoch: 1702372500,
        last_updated: "2023-12-12 20:15",
        temp_c: 30.0,
        temp_f: 86.0,
        is_day: 1,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          code: 1003,
        },
        wind_mph: 6.9,
        wind_kph: 11.2,
        wind_degree: 110,
        wind_dir: "ESE",
        pressure_mb: 1010.0,
        pressure_in: 29.83,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 62,
        cloud: 75,
        feelslike_c: 35.0,
        feelslike_f: 95.0,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 6.0,
        gust_mph: 12.8,
        gust_kph: 20.7,
      },
    },
    {
      location: {
        name: "Melbourne",
        region: "Melbourne",
        country: "Australia",
        lat: -37.67,
        lon: 144.84,
        tz_id: "Australia/Melbourne",
        localtime_epoch: 1702372853,
        localtime: "2023-12-12 20:20",
      },
      current: {
        last_updated_epoch: 1702372500,
        last_updated: "2023-12-12 20:15",
        temp_c: 30.0,
        temp_f: 86.0,
        is_day: 1,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          code: 1003,
        },
        wind_mph: 6.9,
        wind_kph: 11.2,
        wind_degree: 110,
        wind_dir: "ESE",
        pressure_mb: 1010.0,
        pressure_in: 29.83,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 62,
        cloud: 75,
        feelslike_c: 35.0,
        feelslike_f: 95.0,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 6.0,
        gust_mph: 12.8,
        gust_kph: 20.7,
      },
    },
  ];

  const fetchData = async (city) => {
    await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKeys.WeatherApiKey}&q=${city}&days=1&aqi=no&alerts=no`
      )
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          setCurrentCard(res.data);
          //console.log(res.data.location.name);
          setisLoading(false);
          setshowModal(true);
        }
      })
      .catch((err) => {
        setisLoading(false);
        console.log(err);
      });
  };

  const renderDefaultData = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: "#606062",
          padding: 15,
          borderRadius: 25,
          marginTop: 15,
        }}
      >
        <Image
          source={item.image}
          style={{ width: 80, height: 80, left: -10 }}
        />
        <Text
          style={[styles.text, { fontSize: 14, width: "70%", marginRight: 10 }]}
        >
          {item.heading}
        </Text>
      </View>
    );
  };
  const renderWeatherCard = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.location.name}
        style={{
          // flex: 1,
          height: 100,
          width: "100%",
          //borderRadius: 20,
          //   alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#606062",
          marginTop: 10,
          padding: 10,
          //justifyContent: "space-ev",
        }}
        activeOpacity={1}
        onLongPress={() => {
          console.log(item.location.name);
          setCurrentCard(item);
          setshowModal(true);
        }}
      >
        <Image
          source={{
            uri: "https:" + item.current.condition.icon,
          }}
          style={{
            width: 100,
            height: 100,
            resizeMode: "cover",
            marginRight: 10,
          }}
        />
        <View
          style={{ flexDirection: "column", justifyContent: "space-evenly" }}
        >
          <View>
            <Text style={[styles.text, { fontSize: 22 }]}>
              {item.location.name}
            </Text>
          </View>

          <View>
            <Text style={[styles.text, { fontSize: 16 }]}>
              {item.current.condition.text}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", marginRight: 20 }}>
              <FontAwesome5
                name={"temperature-low"}
                size={20}
                color={"white"}
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.text, { fontSize: 16 }]}>
                {item.current.temp_c}
                {" °"}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                name="wind"
                size={20}
                color={"white"}
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.text, { fontSize: 16 }]}>
                {item.current.wind_kph}
                <Text style={{ fontSize: 14 }}></Text> {" kmph"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const QuickActions = (index, qaItem) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Remove City",
                `Are you sure you want to remove ${qaItem.location.name} from favourite list?`,
                [
                  {
                    text: "OK",
                    onPress: async () => await removeItem(qaItem.location.name),
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
            style={{
              flex: 1,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5
              name="trash-alt"
              color={"white"}
              size={20}
              solid={true}
            />
            <Text style={[styles.text, { alignItems: "center", padding: 10 }]}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const removeItem = async (id) => {
    // console.log(id);

    const newState = [...data];
    let x = [...favouriteCities];
    x = x.filter((item) => item !== id);
    await AsyncStorage.setItem("FavouriteCities", JSON.stringify(x));
    setFavouriteCities(x);
    const filteredState = newState.filter((item) => item.location.name !== id);
    Alert.alert("Removed", `${id} removed from favourite cities list`, [
      {
        text: "OK",
      },
    ]);
    return setdata(filteredState);
  };
  const addToFavourite = async (DisplayData) => {
    console.log(DisplayData);
    favouriteCities.push(DisplayData.location.name);
    await AsyncStorage.setItem(
      "FavouriteCities",
      JSON.stringify(favouriteCities)
    );
    setdata([...data, DisplayData]);
    Alert.alert(
      "Successful",
      `${DisplayData.location.name} added to favourite cities list`,
      [
        {
          text: "OK",
        },
      ]
    );
  };

  //   if (!fontsLoaded && !fontError) {
  //     return null;
  //   }
  useEffect(() => {
    const getData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem("FavouriteCities"));
      console.log(x);
      if (x != null && x.length > 0) {
        setisLoading(true);
        setFavouriteCities(x);
        x.forEach((ele) => {
          fetchFavoutiteData(ele);
        });
        setisLoading(false);
      }
      //setdata(x);
    };
    getData();
    // const loader = async () => {
    //   let x = ["Dehradun", "New Delhi", "Almora"];
    //   await AsyncStorage.setItem("FavouriteCities", JSON.stringify(x));
    //   console.log(await AsyncStorage.getItem("FavouriteCities"));
    // };
    // loader();
    //setdata(asyncData);
  }, []);

  const fetchFavoutiteData = async (city) => {
    await axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKeys.WeatherApiKey}&q=${city}&days=1&aqi=no&alerts=no`
      )
      .then((res) => {
        //console.log(res.data);
        if (res.status == 200) {
          //data.push(res.data);
          if (data.length == 0) data.push(res.data);
          else setdata([...data, res.data]);
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text> Home </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Display")}>
        <Text>Go to Displays</Text>
      </TouchableOpacity> */}

      <View
        style={{ flex: 1, backgroundColor: "#333238", flexDirection: "column" }}
      >
        {/* Heading */}
        <View style={{ marginVertical: 30 }}>
          <Text style={styles.headingText}>Weather App</Text>
        </View>
        {/* Search Bar */}
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#606062",
            alignSelf: "center",
            borderRadius: 20,
          }}
        >
          <TextInput
            onChangeText={(text) => setCity(text)}
            placeholder="Search for a city or airport"
            placeholderTextColor={"gray"}
            style={{
              flex: 0.9,
              height: 50,
              color: "white",
              fontFamily: "Poppins_500Medium",
              alignSelf: "center",
              marginLeft: 10,
            }}
            onSubmitEditing={() => {
              setisLoading(true);
              fetchData(city);
              //setshowModal(true);
            }}
            value={city}
          />
          {city.length > 0 ? (
            <TouchableOpacity onPress={() => setCity("")}>
              <FontAwesome
                name="close"
                size={20}
                color={"white"}
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
          ) : null}
          {/* <TouchableOpacity>
            <FontAwesome5
              name="search"
              size={20}
              color={"white"}
              style={{
                alignSelf: "center",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
            />
          </TouchableOpacity> */}
        </View>
        {/* Body */}

        {data.length == 0 ? (
          <View style={{ marginTop: 20 }}>
            <Text
              style={[
                styles.headingText,
                {
                  width: "90%",
                  alignSelf: "center",
                  fontSize: 20,
                  textAlign: "left",
                },
              ]}
            >
              Features
            </Text>
            <FlatList
              data={defaultData}
              renderItem={renderDefaultData}
              bounces={false}
              scrollEnabled={true}
            />
          </View>
        ) : (
          <View style={{ marginTop: 20, marginBottom: 200 }}>
            <Text
              style={[
                styles.headingText,
                {
                  width: "90%",
                  alignSelf: "center",
                  fontSize: 20,
                  textAlign: "left",
                },
              ]}
            >
              Favourite Cities
            </Text>
            <SwipeableFlatList
              data={data}
              keyExtractor={(item) => item.location.name}
              renderItem={renderWeatherCard}
              maxSwipeDistance={69}
              renderQuickActions={({ index, item }) =>
                QuickActions(index, item)
              }
              //contentContainerStyle={styles.contentContainerStyle}
              shouldBounceOnMount={false}
              bounce={false}

              //ItemSeparatorComponent={renderItemSeparator}
            />
          </View>
        )}
      </View>
      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              borderRadius: 20,
              width: 175,
              height: 175,
              //justifyContent: "space-evenly",
              flexDirection: "column",
            }}
          >
            <Image
              source={loading}
              style={{
                alignSelf: "center",
                width: 100,
                height: 100,
                marginTop: 20,
              }}
              resizeMode={"cover"}
            />
            <Text
              style={[
                styles.text,
                {
                  alignSelf: "center",
                  textAlign: "center",
                  color: "black",
                  width: "100%",
                  fontSize: 20,
                  // padding: 10,
                  // padding: 10,
                },
              ]}
            >
              Loading...
            </Text>
          </View>
        </View>
      )}
      {showModal ? (
        <Modal
          animationType="slide"
          transparent
          visible={showModal}
          onRequestClose={() => {
            setshowModal(!showModal);
          }}
        >
          <View
            style={{
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.8)",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={[
                styles.modalView,
                {
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  //minHeight: 550,
                  height: "90%",
                  justifyContent: "space-evenly",
                },
              ]}
            >
              {/* Modal Heading */}
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Entypo
                  name="location-pin"
                  color={"white"}
                  size={30}
                  style={{ alignSelf: "center", left: -15 }}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      alignSelf: "center",
                      color: "white",
                      fontSize: 30,
                      left: -15,
                    },
                  ]}
                >
                  {CurrentCard.location.name}
                </Text>
              </View>
              {/* Close Button */}
              <FontAwesome
                name="close"
                color="white"
                size={26}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  margin: 20,
                }}
                onPress={() => {
                  setshowModal(false);
                  setCity("");
                }}
              />
              {/* Modal Sub-Heading */}
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  width: "90%",
                  top: -10,
                }}
              >
                <Text style={[styles.text, { color: "white", fontSize: 20 }]}>
                  {CurrentCard.location.region}
                  {", "}
                  {CurrentCard.location.country}
                </Text>
              </View>
              {/* Middle Part */}
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  width: "90%",
                  top: -10,
                  justifyContent: "space-between",
                }}
              >
                <View style={{}}>
                  {/* Temperature */}
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    {/* <FontAwesome5
                      name={"temperature-low"}
                      size={40}
                      color={"white"}
                      style={{ marginRight: 5 }}
                    /> */}
                    <Text style={[styles.text, { fontSize: 60 }]}>
                      {CurrentCard.current.temp_c}
                      {"°"}
                    </Text>
                  </View>
                  <Text style={[styles.text, { fontSize: 20, top: -10 }]}>
                    {CurrentCard.current.condition.text}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      top: -5,
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Humidity */}
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="water"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={[styles.text, { fontSize: 16 }]}>
                        {CurrentCard.current.humidity}
                        {"%"}
                      </Text>
                    </View>
                    {/* Wind Speed */}
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome5
                        name="wind"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={[styles.text, { fontSize: 16 }]}>
                        {CurrentCard.current.wind_kph}
                        <Text style={{ fontSize: 14 }}>{" kmph"}</Text>
                      </Text>
                    </View>
                    {/* Air Pressure */}
                    <View style={{ flexDirection: "row" }}>
                      <Entypo
                        name="gauge"
                        size={20}
                        color={"white"}
                        style={{ marginRight: 5 }}
                      />
                      <Text style={[styles.text, { fontSize: 16 }]}>
                        {CurrentCard.current.pressure_in}
                        <Text style={{ fontSize: 14 }}>{" mbar"}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Astro Sunrise/Sunset */}
              <View
                style={{
                  flexDirection: "row",
                  top: -5,
                  right: -2.5,
                  width: "92.5%",
                  alignSelf: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Feather
                    name={"sunrise"}
                    color={"white"}
                    size={27}
                    style={{ marginRight: 7.5, alignSelf: "baseline" }}
                  />
                  <Text style={[styles.text, { fontSize: 20 }]}>
                    {CurrentCard.forecast.forecastday[0].astro.sunrise}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Feather
                    name={"sunset"}
                    color={"white"}
                    size={27}
                    style={{ marginRight: 7.5, alignSelf: "baseline" }}
                  />
                  <Text style={[styles.text, { fontSize: 20 }]}>
                    {CurrentCard.forecast.forecastday[0].astro.sunset}
                  </Text>
                </View>
              </View>
              {/*Hourly Forecast */}
              <View style={{ height: 150, marginTop: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    right: -10,
                  }}
                >
                  <FontAwesome5
                    name="clock"
                    color={"white"}
                    size={20}
                    style={{ marginRight: 10 }}
                    solid={true}
                  />
                  <Text style={[styles.text, { fontSize: 20 }]}>
                    Hourly Forecast
                  </Text>
                </View>
                <ScrollView
                  style={{ flexDirection: "row", marginTop: 10 }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                >
                  {CurrentCard.forecast.forecastday[0].hour.map((item) => {
                    let timeA = dayjs.unix(item.time_epoch);
                    let time = dayjs(timeA).format("h A");
                    //console.log(time);
                    return (
                      <View
                        key={time}
                        style={{
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center",
                          width: 70,
                          height: 110,
                          borderRadius: 20,
                          backgroundColor: "#7BBEE58A",
                          margin: 5,
                        }}
                      >
                        <Text style={[styles.text, { fontSize: 14 }]}>
                          {time}
                        </Text>
                        <Image
                          source={{
                            uri: "https:" + item.condition.icon,
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            resizeMode: "cover",
                          }}
                        ></Image>
                        <Text style={[styles.text]}>
                          {item.temp_c}
                          {" °C"}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              {/* Favourite Button */}
              {favouriteCities.indexOf(CurrentCard.location.name) != -1 ? (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                  activeOpacity={0.7}
                  onPress={async () => {
                    Alert.alert(
                      "Remove City",
                      `Are you sure you want to remove ${CurrentCard.location.name} from favourite list?`,
                      [
                        {
                          text: "OK",
                          onPress: async () =>
                            await removeItem(CurrentCard.location.name),
                        },
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                      ]
                    );
                  }}
                >
                  <FontAwesome
                    name="heart"
                    color={"red"}
                    size={16}
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    {/* Add to Favourite */}
                    Saved to Favourite
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                  activeOpacity={0.7}
                  onPress={async () => {
                    addToFavourite(CurrentCard);
                  }}
                >
                  <FontAwesome
                    name="heart-o"
                    color={"white"}
                    size={16}
                    style={{ marginRight: 5 }}
                  />

                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 16,
                      },
                    ]}
                  >
                    Add to Favourite
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
}

export default Home;
const styles = StyleSheet.create({
  headingText: {
    fontFamily: "Poppins_500Medium",
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "justify",
  },
  qaContainer: {
    //right: -60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "red",
  },
  modalView: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    width: "100%",
    backgroundColor: "#88D2FD",
    //backgroundColor: "#606062",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
