import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainContainer from "../components/containers/MainContainer";
import KeyboardAvoidWrapper from "../components/containers/KeyboardAvoidWrapper";
import CustomTextInput from "../components/inputText/CustomTextInput";
import { styles } from "../assets/styles";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<
    RootStackParamList,
    "RegisterScreen"
>;

const CreateAccount = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const REGISTER = gql`
    mutation Mutation($createUserInput: CreateUserInput!) {
      createUser(createUserInput: $createUserInput) {
        first_name
        last_name
        email
        password
        date_of_birth
      }
    }
  `;

  const [sendQuery] = useMutation(REGISTER, {
    onError: (error) => {
      error.graphQLErrors.map((e) => {
        console.log("e: ", e);
        if (
          e.message.startsWith("duplicate key value violates unique constraint")
        )
          Alert.alert("Cette adresse mail existe déjà");
      });
    },
  });

  const formatDate = (date: string) => {
    if (date.length === 3 && !date.includes("/")) {
      setBirthdate(`${date.substring(0, 2)}/${date.substring(2)}`);
    } else if (date.length === 6 && !date.includes("/", 6)) {
      setBirthdate(`${date.substring(0, 5)}/${date.substring(5)}`);
    } else setBirthdate(date);
  };

  const handleSubmit = () => {
    if (!firstName) {
      Alert.alert("Merci d'entrer un prénom");
    } else if (!lastName) {
      Alert.alert("Merci d'entrer un nom");
    } else if (
      !birthdate ||
      !birthdate.match(
        /^(?:(?:[12][0-9]|0?[1-9])\/0?2|(?:30|[12][0-9]|0?[1-9])\/(?:0?[469]|11)|(?:3[01]|[12][0-9]|0?[1-9])\/(?:0?[13578]|1[02]))\/[0-9]{4}$/
      )
    ) {
      Alert.alert("Le format de date est incorrect");
    } else if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      Alert.alert("Le format d'email est incorrect");
    } else if (password !== confirmPassword) {
      Alert.alert("Les mots de passe ne correspondent pas.");
    } else {
      let databaseDate = `${birthdate.substring(6, 10)}-${birthdate.substring(
        3,
        5
      )}-${birthdate.substring(0, 2)}T00:00:00.000Z`;

      sendQuery({
        variables: {
          createUserInput: {
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email,
            date_of_birth: databaseDate,
          },
        },
        onCompleted: (data) => {
          if (data.createUser) {
            Alert.alert("Inscription réussie");
            navigation.push("LoginScreen");
          }
        },
      });
    }
  };

  return (
    <MainContainer>
      <KeyboardAvoidWrapper>
        <View style={styles.registerHeader}>
          <Pressable onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.registerForm}>
          <Text style={styles.registerTitle}>
            Rejoignez la communauté EcoVoit !
          </Text>
          <CustomTextInput
            onChangeText={(text) => setFirstName(text)}
            label="Prénom"
            keyboardType="default"
          />
          <CustomTextInput
            onChangeText={(text) => setLastName(text)}
            label="Nom"
            keyboardType="default"
          />
          <CustomTextInput
            onChangeText={(text) => {
              formatDate(text);
            }}
            value={birthdate}
            label="Date de naissance"
            keyboardType="numeric"
            placeholder="JJ/MM/AAAA"
            textContentType="birthday"
          />
          <CustomTextInput
            onChangeText={(text) => setEmail(text)}
            label="Email"
            keyboardType="email-address"
          />
          <CustomTextInput
            onChangeText={(text) => setPassword(text)}
            label="Mot de passe"
            IsSecureText={true}
            keyboardType="default"
          />
          <CustomTextInput
            onChangeText={(text) => setConfirmPassword(text)}
            label="Confirmation mot de passe"
            IsSecureText={true}
            keyboardType="default"
          />
          <Pressable style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerText}>S'inscrire</Text>
          </Pressable>
        </View>
      </KeyboardAvoidWrapper>
    </MainContainer>
  );
};

export default CreateAccount;
