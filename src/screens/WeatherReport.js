import { useEffect, useState } from "react";
import { Image, ImageBackground, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StaticVariable from "../components/StaticVariable";
import Card from "../components/Card";

const WeatherReport = () => {
  const [weatherData, setWeatherData] = useState({});
  const [coordinate, setCoordinate] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo != null && Object.keys(userInfo).length) getLatLong();
  }, [userInfo]);

  useEffect(() => {
    if (coordinate != null && coordinate.length) {
      getweather();
    }
  }, [coordinate]);

  const getUserInfo = async () => {
    let value = await AsyncStorage.getItem("userData");
    value = JSON.parse(value);
    setUserInfo(value);
  };

  const getLatLong = async () => {
    const cityName = userInfo.location;
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${"IN"}&appid=${
        StaticVariable.Api
      }`
    );
    const json = await response.json();
    setCoordinate(json);
    console.log(json);
  };

  const getweather = async () => {
    const lat = coordinate[0].lat;
    const lon = coordinate[0].lon;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${StaticVariable.Api}`
    );
    const json = await response.json();
    setWeatherData(json);
    setIsDataLoading(false);
  };

  if (isDataLoading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require("../Images/Weather.jpg")}
      style={{ flex: 1 }}
    >
      <View>
        <Card text={`Welcome ${userInfo.name}`} />
        <Card text={`Your City ${userInfo.location}`} />
        <Card
          text={`Temparature C ${Math.round(weatherData.main.temp - 273)}`}
        />
        <Card text={`Temparature K ${weatherData.main.temp}`} />
        <Card text={`Weather is ${weatherData.weather[0].description}`}>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
            }}
          />
        </Card>
      </View>
    </ImageBackground>
  );
};
export default WeatherReport;
