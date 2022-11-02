import { useState } from "react";
import { View, ImageBackground, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserInput from "../components/UserInput";
import Button from "../components/Button";

const storeData = async (userInfo) => {
  const jsonValue = JSON.stringify(userInfo);
  await AsyncStorage.setItem("userData", jsonValue);
};

const SingUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const validation = () => {
    if (userInfo.password == userInfo.confirmPassword) {
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
      <KeyboardAvoidingView behavior="position">
        <View style={{ margin: 40 }} />
        <UserInput
          text="Your Name"
          onChangeText={(user) =>
            setUserInfo((prevState) => ({ ...prevState, name: user }))
          }
        />
        <View style={{ margin: 10 }} />
        <UserInput
          text="Password"
          type="password"
          onChangeText={(pass) =>
            setUserInfo((prevState) => ({ ...prevState, password: pass }))
          }
        />
        <View style={{ margin: 10 }} />
        <UserInput
          text="conform Password"
          type="password"
          onChangeText={(value) =>
            setUserInfo((state) => ({ ...state, confirmPassword: value }))
          }
        />
        <View style={{ margin: 10 }} />
        <UserInput
          text="Location"
          onChangeText={(value) =>
            setUserInfo((prevState) => ({ ...prevState, location: value }))
          }
        />
        <View style={{ margin: 60 }} />

        <Button
          title="Sing Up"
          disabled={validation()}
          onPress={() => {
            alert("Successfully SingUp");
            storeData(userInfo);
          }}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default SingUp;
