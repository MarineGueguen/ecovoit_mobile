import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { gql } from '@apollo/client';
import CustomTextInput from "../components/inputText/CustomTextInput";
import { useMutation } from '@apollo/client/react';
import * as SecureStore from 'expo-secure-store';

import MainContainer from "../components/containers/MainContainer";
import KeyboardAvoidWrapper from "../components/containers/KeyboardAvoidWrapper";
import { styles } from "../assets/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";


const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`;
type Props = NativeStackScreenProps<
  RootStackParamList, 
  'LoginScreen'> & {
  onUserLogin: () => void;
};

const Login = ({ navigation, onUserLogin }: Props) => {
  const [email, setEMail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);
  const [sendQuery, {data, loading}] = useMutation(LOGIN, {onError:(error) => {
    error.graphQLErrors.map((e) => {
    console.log(e)
});
}}
);
const [isPressed, setIsPressed] = useState<boolean>(false);

const handlePress = (): void => {
  setIsPressed(true);
};

  const onUsernameChange = (email: String) => {
    setEMail(email);
  };
  const onPasswordChange = (password: String) => {
    setPassword(password);
  };

  const loginPress = () => {
    sendQuery({
      variables: {
        "loginInput": {
          "email": email,
          "password": password
        }
      },
      onCompleted: (data) => {
        SecureStore.setItemAsync("token", data.login).then(() => {
          onUserLogin();
        });
      }
    });
  };

  return (
    <MainContainer>
      <KeyboardAvoidWrapper>
        <Image
          source={require("../assets/logo.png")}
          style={styles.styleLogo}
        />
        <View style={styles.loginForm}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginTitle}>Ecovoit</Text>
        </View>
          <View style={styles.loginDivider}></View>
          <CustomTextInput
            onChangeText={onUsernameChange}
            label="Email"
            keyboardType={"email-address"}
            placeholder="E-mail"
          />
          <CustomTextInput
            onChangeText={onPasswordChange}
            label="Mot de passe"
            IsSecureText={true}
            keyboardType="default"
            placeholder="Mot de passe"
          />
            <Pressable style={styles.loginButton} onPress={loginPress}>
                <Text style={styles.loginText}>Se connecter</Text>
            </Pressable>
            <Pressable style={styles.loginScreenRegisterButton} onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.loginScreenRegisterText}>S'inscrire</Text>
            </Pressable>
          <View style={styles.loginForgottenPassword}>
            <Pressable onPress={() => {}}>
              <Text style={styles.loginForgottenPasswordLink}>
                Mot de passe oublié ?
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidWrapper>
    </MainContainer>
  );
};

export default Login;
