import React, { useState } from "react";
import { View, Text } from "react-native";

import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { styles } from "../assets/styles";
import "moment/locale/fr"; // import French locale


type Props = NativeStackScreenProps<
    RootStackParamList,
    "AgendaScreen"
>;


moment.locale("fr"); // set moment locale to French

const customI18n = {
  w: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
};

const AgendaScreen = ({ navigation, route }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const journeyInput = route.params?.journey;

  const onDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={onDateChange}
          weekdays={customI18n["w"]}
          months={moment.months()}
          startFromMonday={true}
          previousTitle="Précédent"
          nextTitle="Suivant"
        />
        <Text style={styles.registerText}>
          {selectedDate ? moment(selectedDate).format("LL") : ""}
        </Text>
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() => navigation.navigate("EndScreen", {
            journey: {
              ...journeyInput,
              selectedDate
            }
          })}
        />
        <Ionicons
          name="arrow-forward"
          type="font-awesome"
          style={styles.bottomRightIcon}
          onPress={() =>
            navigation.navigate("TimeScreen", {
              journey: { ...journeyInput, selectedDate }
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AgendaScreen;
