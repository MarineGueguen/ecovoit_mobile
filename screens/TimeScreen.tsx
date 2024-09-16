import React, { useState } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { styles } from "../assets/styles";
import "moment/locale/fr"; // import French locale
import DatePicker from "@react-native-community/datetimepicker";
import { createJourneyInput } from "../interfaces/journey";


type Props = NativeStackScreenProps<
    RootStackParamList,
    "TimeScreen"
>;

moment.locale("fr"); // set moment locale to French

const TimeScreen = ({ navigation, route }: Props) => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());
  const journeyInput = route.params?.journey as createJourneyInput;

  const onTimeChange = (event: any, selectedDate?: Date) => {
    const currentTime = selectedDate || selectedTime;
    setSelectedTime(currentTime);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.timerText}>
          A quelle heure souhaitez-vous partir?
        </Text>
        <Text style={styles.timerBorder}>
          {selectedTime ? moment(selectedTime).format("LT") : ""}
        </Text>
        {selectedTime && (
          <DatePicker
            testID="dateTimePicker"
            value={selectedTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        )}
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() => navigation.navigate("AgendaScreen", {
            journey: {
              ...journeyInput,
              selectedTime
            }
          })}
        />
        <Ionicons
          name="arrow-forward"
          type="font-awesome"
          style={styles.bottomRightIcon}
          onPress={() =>
            navigation.navigate("PassengerScreen", {
              journey: { ...journeyInput, selectedTime },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TimeScreen;
