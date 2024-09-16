import React, { useState } from "react";
import {
  View,
  Text,
  TextInput
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/styles";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "EndScreen"
>;


const EndScreen = ({ navigation, route }: Props) => {
  const [arrival, setArrival] = useState<string>("");
  const journeyInput = route.params?.journey;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.TextInputAdd}>Où allez-vous?</Text>
        <TextInput
          onChangeText={(text) => setArrival(text)}
          style={styles.publishInput}
          placeholder="Saissisez l'adresse"
        />
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() => navigation.navigate("PublishScreen", {
            journey: {
              ...journeyInput,
              arrival
            }
          })}
        />
        <Ionicons
          name="arrow-forward"
          type="font-awesome"
          style={styles.bottomRightIcon}
          onPress={() => navigation.navigate('AgendaScreen', { journey: {...journeyInput, arrival} })}
        />
      </View>
    </SafeAreaView>
  );
};
export default EndScreen;
