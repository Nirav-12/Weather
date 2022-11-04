import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StaticVariable from "./src/components/StaticVariable";
import Card from "./src/components/Card";
import { EvilIcons } from "@expo/vector-icons";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState({});
  const [coordinate, setCoordinate] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  console.log("weather data --->>", weatherData);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (location) {
      getLatLong();
      setIsDataLoading(true);
    }
  }, [location]);

  useEffect(() => {
    if (coordinate != null && coordinate.length) {
      getweather();
    } else {
      setWeatherData({});
      setIsDataLoading(false);
    }
  }, [coordinate]);

  const getUserInfo = async () => {
    try {
      let value = await AsyncStorage.getItem("location");
      if (value !== null) {
        // value previously stored
        setLocation(value);
      } else {
        setLocation("Surat");
      }
    } catch (e) {
      // error reading value
      console.log("storage user info", e);
    }
  };

  const getLatLong = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location},${"IN"}&appid=${
          StaticVariable.Api
        }`
      );
      const json = await response.json();
      setCoordinate(json);
      console.log("--->>>", json);
    } catch (error) {
      console.log("error in fetch lat long");
    }
  };

  const getweather = async () => {
    const lat = coordinate[0].lat;
    const lon = coordinate[0].lon;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${StaticVariable.Api}`
      );
      const json = await response.json();
      console.log("get data for -->>", JSON.stringify(json));
      await AsyncStorage.setItem("location", location);
      setWeatherData(json);
      setIsDataLoading(false);
    } catch (error) {
      console.log("error in fetch data");
    }
  };

  return (
    <ImageBackground
      source={require("./src/Images/background.png")}
      blurRadius={10}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.text_input_container}>
          <TextInput
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            style={{
              width: "80%",
              padding: 8,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setLocation(search);
            }}
          >
            <EvilIcons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {isDataLoading ? (
          <View style={{ justifyContent: "center", flex: 1 }}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 30,
                marginTop: 20,
              }}
            >
              {location} Weather
            </Text>
            {Object.keys(weatherData).length ? (
              <View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 100 }}>
                    {`  ${Math.round(weatherData?.main?.temp - 273)}`}
                  </Text>
                  <Text style={{ fontSize: 17, lineHeight: 50 }}>°C</Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Image
                    style={{ height: 50, aspectRatio: 1 }}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`,
                    }}
                  />

                  <Text
                    style={{ fontSize: 30 }}
                  >{`${weatherData?.weather[0]?.main}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    margin: 20,
                    justifyContent: "space-between",
                    marginTop: 40,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 25, marginBottom: 10 }}>
                      Wind 🌪
                    </Text>
                    <Text
                      style={{ paddingVertical: 5 }}
                    >{`Speed: ${weatherData?.wind?.speed} meter/sec`}</Text>
                    <Text>{`Degree: ${weatherData?.wind?.deg} degrees`}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 25, marginBottom: 10 }}>
                      🌡 Temperature
                    </Text>
                    <Text style={{ paddingVertical: 5 }}>{`Max🌡: ${Math.round(
                      weatherData?.main?.temp_max - 273
                    )} celsius `}</Text>
                    <Text>{`Min 🌡: ${Math.round(
                      weatherData?.main?.temp_max - 273
                    )} celsius `}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 30,
                  }}
                >
                  <Card text={`${weatherData.clouds.all} %`} icon={"☁"} />
                  <Card text={`${weatherData.main.pressure} hPa`} icon={"💧"} />
                  <Card
                    text={`${weatherData.visibility / 1000} km`}
                    icon={"👁️"}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 250,
                }}
              >
                <Text style={{ fontSize: 25 }}>No Data Found</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};
export default WeatherReport;

const styles = StyleSheet.create({
  text_input_container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 5,
    borderRadius: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    marginTop: 100,
  },
});
