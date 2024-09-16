import React, { useState } from "react";
import { View, Text, Switch, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles";
import { createJourneyInput } from "../interfaces/journey";
import { useQuery } from "@apollo/client";
import { FIND_USER } from "../constants/users";
import { RootStackParamList } from '../App';


type Props = NativeStackScreenProps<
    RootStackParamList,
    "OptionsScreen"
>;

type Vehicle = {
  id: number;
  model: string;
};

type Select = {
  value: string;
  label: string;
}

const OptionsScreen = ({ navigation, route } : Props) => {
  const [isInstantBookable, setInstantBookabled] = useState(false);
  const [isSmoker, setIsSmoker] = useState(false);
  const [isTalkative, setIsTalkative] = useState(false);
  const [isMusicLover, setIsMusicLover] = useState(false);

  const { data } = useQuery(FIND_USER);
  const vehicles = data?.findUser?.vehicles.map((v: Vehicle) => ({
    value: v.id,
    label: v.model,
  })) || [];

  const instantBookabled = () =>
    setInstantBookabled((previousState) => !previousState);
  const smoker = () => setIsSmoker((previousState) => !previousState);
  const talkative = () => setIsTalkative((previousState) => !previousState);
  const musicLover = () => setIsMusicLover((previousState) => !previousState);

  const journeyInput = route.params?.journey as createJourneyInput;
  const [selectedCar, setSelectedCar] = useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.timerText}>Vos options</Text>
        <Picker
          selectedValue={selectedCar}
          onValueChange={(itemValue) => setSelectedCar(itemValue)}
          style={styles.PickerStyle}
        >
          {vehicles.map((v: Select, i: React.Key) => (
            <Picker.Item key={i} label={v.label} value={parseInt(v.value)} />
          ))}
        </Picker>
        <View style={styles.separatorLineOptions} />
        <View style={styles.switchContainer}>
          <Text>Reservation automatique:</Text>
          <Switch
            trackColor={{ false: "#d9534f", true: "#9FCEB4" }}
            thumbColor="white"
            onValueChange={instantBookabled}
            value={isInstantBookable}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Fumeur:</Text>
          <Switch
            trackColor={{ false: "#d9534f", true: "#9FCEB4" }}
            thumbColor="white"
            onValueChange={smoker}
            value={isSmoker}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Discuter:</Text>
          <Switch
            trackColor={{ false: "#d9534f", true: "#9FCEB4" }}
            thumbColor="white"
            onValueChange={talkative}
            value={isTalkative}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text>Musique:</Text>
          <Switch
            trackColor={{ false: "#d9534f", true: "#9FCEB4" }}
            thumbColor="white"
            onValueChange={musicLover}
            value={isMusicLover}
          />
        </View>
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() => navigation.navigate("PassengerScreen", {
            journey: {
              ...journeyInput,
              isInstantBookable,
              isSmoker,
              isTalkative,
              isMusicLover,
              carId: selectedCar
            }
          })}
        />
        <Ionicons
          name="arrow-forward"
          type="font-awesome"
          style={styles.bottomRightIcon}
          onPress={() =>
            navigation.navigate("CommentScreen", {
              journey: {
                ...journeyInput,
                isInstantBookable,
                isSmoker,
                isTalkative,
                isMusicLover,
                carId: selectedCar
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default OptionsScreen;
