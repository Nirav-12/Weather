import { ImageBackground, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInput from "../components/UserInput";
import Button from "../components/Button";

const ForgotPass = () => {
  const [userInput, setUserInput] = useState({
    name: "",
  });
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    let value = await AsyncStorage.getItem("userData");
    value = JSON.parse(value);
    setUserInfo(value);
  };

  const validation = () => {
    if (userInput.name == userInfo.name) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ImageBackground
      source={require("../Images/Weather.jpg")}
      style={{ flex: 1 }}
    >
      <View style={{ margin: 60 }} />
      <UserInput
        placeholder="User Name"
        onChangeText={(value) =>
          setUserInput((prevState) => ({ ...prevState, name: value }))
        }
      />

      <View style={{ margin: 60 }} />

      <Button
        title="Get Password"
        disabled={validation()}
        onPress={() => console.log(`Your PassWord is${userInfo.password}`)}
      />
    </ImageBackground>
  );
};
export default ForgotPass;
