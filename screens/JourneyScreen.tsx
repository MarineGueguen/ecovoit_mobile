import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

const JourneyScreen = ({
	route,
}: NativeStackScreenProps<
	RootStackParamList, 
	"JourneyScreen">) => {
	return (
		<View>
			<Text>Trajet {route.params.id}</Text>
		</View>
	);
};

export default JourneyScreen;

const styles = StyleSheet.create({});
