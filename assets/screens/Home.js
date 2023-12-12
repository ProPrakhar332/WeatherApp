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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_500Medium } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import SwipeableFlatList from "react-native-swipeable-list";
//images
import logo from "../images/logo.png";
import weatherapiLogo from "../images/weatherapiLogo.png";

//icons
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import img1 from "../icons/img1.png";
import img2 from "../icons/img2.png";
import img3 from "../icons/img3.png";
import img4 from "../icons/img4.png";

//gif
import waiting from "../animated/waiting2.gif";

export function Home({ navigation }) {
  const [data, setdata] = useState(null);
  const [city, setCity] = useState("");
  const [showModal, setshowModal] = useState(true);
  const [isLoading, setisLoading] = useState(false);
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

  const renderDefaultData = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          width: "95%",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: "#606062",
          padding: 15,
          borderRadius: 50,
          marginTop: 20,
        }}
      >
        <Image
          source={item.image}
          style={{ width: 80, height: 80, left: -10 }}
        />
        <Text style={[styles.text, { width: "70%", marginRight: 10 }]}>
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
          flex: 1,
          width: "100%",
          //borderRadius: 20,
          //   alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#606062",
          marginTop: 10,
          padding: 10,
          //justifyContent: "space-between",
        }}
        activeOpacity={1}
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
        <View style={{ flexDirection: "column" }}>
          <View>
            <Text style={[styles.text, { fontSize: 22 }]}>
              {item.location.name}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <Text style={[styles.text, { fontSize: 16, top: -3 }]}>
                {item.current.condition.text}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <FontAwesome5
                  name={
                    item.current.temp_c >= 19
                      ? "temperature-high"
                      : "temperature-low"
                  }
                  size={20}
                  color={"white"}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.text, { fontSize: 16 }]}>
                  {item.current.temp_c}
                  {" °C"}
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
                  {" kmph"}
                </Text>
              </View>
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
            onPress={() => {}}
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

  //   if (!fontsLoaded && !fontError) {
  //     return null;
  //   }
  useEffect(() => {
    const getData = async () => {
      let x = await AsyncStorage.getItem("Pop");
      console.log(x);
    };
    //getData();
  }, []);
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
            value={city}
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
              //setisLoading(true);
              setshowModal(true);
            }}
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

        {!data ? (
          <FlatList
            data={defaultData}
            renderItem={renderDefaultData}
            style={{ marginTop: 20 }}
          />
        ) : (
          <SwipeableFlatList
            data={asyncData}
            keyExtractor={(item) => item.location.name}
            renderItem={renderWeatherCard}
            maxSwipeDistance={69}
            renderQuickActions={({ index, item }) => QuickActions(index, item)}
            //contentContainerStyle={styles.contentContainerStyle}
            shouldBounceOnMount={false}
            bounce={false}
            //ItemSeparatorComponent={renderItemSeparator}
          />
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
              source={waiting}
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
                  // padding: 10,
                  // padding: 10,
                },
              ]}
            >
              Fetching Data
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
                },
              ]}
            >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                }}
              >
                <Text>{city}</Text>
                <FontAwesome
                  name="close"
                  color="black"
                  size={26}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                  onPress={() => {
                    setshowModal(false);
                    setCity("");
                  }}
                />
              </View>
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
    backgroundColor: "white",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
