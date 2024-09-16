import React, { useState } from "react";
import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { RootStackParamList } from "../App";
import { USER_JOURNEYS } from "../constants/journeys";
import { JourneyCardInformations } from "../interfaces/journey";
import CardsContainer from "../components/containers/cardsContainer";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<
  RootStackParamList, 
  "ResultsScreen"
>;

const ResultsScreen = ({ navigation }: Props) => {
  const [journeys, setJourneys] = useState<JourneyCardInformations[]>([]);

  const { data } = useQuery(USER_JOURNEYS, {
    onCompleted: (data) => {
      const loadedJourneys = (data.findUserBookings || []).map(
        (obj: any) => obj.journey
      );
      setJourneys(loadedJourneys);
    },
    onError: (err) => console.log(err),
  });

  return journeys.length > 0 ? (
    <FlatList
      data={journeys}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CardsContainer item={item} navigation={navigation} />
      )}
    />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Aucun trajet à venir</Text>
    </SafeAreaView>
  );
};

export default ResultsScreen;
