import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UserInput from "../components/UserInput";

import NavButton from "../components/NavButton";
import Button from "../components/Button";

import { useEffect, useState } from "react";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});

  const [userInput, setUserInput] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    let value = await AsyncStorage.getItem("userData");
    value = JSON.parse(value);
    setUserInfo(value);
  };

  const validation = () => {
    if (
      userInfo.password == userInput.password &&
      userInfo.name == userInput.name
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../Images/Weather.jpg")}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView behavior="position">
          <View style={{ margin: 40 }} />
          <UserInput
            placeholder="User Name"
            onChangeText={(value) =>
              setUserInput((prevState) => ({ ...prevState, name: value }))
            }
          />
          <View style={{ margin: 10 }} />
          <UserInput
            placeholder="PassWord"
            secureTextEntry
            onChangeText={(value) =>
              setUserInput((pass) => ({ ...pass, password: value }))
            }
          />

          <View style={{ margin: 10 }} />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <NavButton
              text="SingUp"
              onPress={() => navigation.navigate("SingUp")}
            />
            <View style={{ margin: 60 }} />
            <NavButton
              text="Forgot PassWord ?"
              onPress={() => navigation.navigate("ForgotPass")}
            />
          </View>
          <Button
            title="Login"
            disabled={validation()}
            onPress={() => navigation.navigate("WeatherReport")}
          />
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
export default Login;
