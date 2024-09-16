import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/styles";
import { Ionicons } from "@expo/vector-icons";
import { createJourneyInput } from "../interfaces/journey";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "PassengerScreen"
>;

const PassengerScreen = ({ navigation, route }: Props) => {
  const [passengers, setPassengers] = useState<number>(3);
  const journeyInput = route.params?.journey as createJourneyInput;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.timerText}>Combien de passagers prenez-vous?</Text>
        <View style={styles.passengerContainer}>
          <Pressable
            onPress={() => passengers > 1 && setPassengers(passengers - 1)}
          >
            <Ionicons name="remove-circle-outline" size={44} color="black" />
          </Pressable>
          <Text style={styles.passengersText}>{passengers}</Text>
          <Pressable
            onPress={() => passengers < 4 && setPassengers(passengers + 1)}
          >
            <Ionicons name="add-circle-outline" size={44} color="black" />
          </Pressable>
        </View>
          <Text style={styles.textTiltePassenger}>Courage c'est bientôt fini ! 💪 </Text>
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() => navigation.navigate("TimeScreen", {
            journey: {
              ...journeyInput,
              passengers
            }
          })}
        />
        <Ionicons
          name="arrow-forward"
          type="font-awesome"
          style={styles.bottomRightIcon}
          onPress={() => navigation.navigate('OptionsScreen', {
            journey: { ... journeyInput, passengers }
          })}
        />
      </View>
    </SafeAreaView>
  );
};

export default PassengerScreen;
