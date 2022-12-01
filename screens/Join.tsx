import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, TextInput } from "react-native";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";
import auth from "@react-native-firebase/auth";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const StyledTextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitEmailEditing = () => {
    passwordInput.current?.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email == "" || password == "") {
      return Alert.alert("Fill in the form");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/weak-password": {
          Alert.alert("Write a stronger password!");
        }
      }
      setLoading(false);
    }
  };
  return (
    <Container>
      <StyledTextInput
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text: string) => setEmail(text)}
        placeholder="Email"
        returnKeyType="next"
        returnKeyLabel="Next"
        onSubmitEditing={onSubmitEmailEditing}
      />
      <StyledTextInput
        ref={passwordInput}
        value={password}
        secureTextEntry
        onChangeText={(text: string) => setPassword(text)}
        placeholder="Password"
        returnKeyType="done"
        returnKeyLabel="Done"
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color={"white"} />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;
