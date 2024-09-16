import React, { useState } from "react";
import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Pressable,
	Modal,
	StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLazyQuery } from "@apollo/client";
import { RESEARCH_JOURNEYS } from "../constants/journeys";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { styles as sharedStyles } from "../assets/styles";

const SearchScreen: React.FC = () => {
	const [searchJourneys] = useLazyQuery(RESEARCH_JOURNEYS);

	// Form handlers
	const [departure, setDeparture] = useState<string>("");
	const [arrival, setArrival] = useState<string>("");
	const [passengersNumber, setPassengersNumber] = useState<number>(0);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	// Display handlers
	const [isPressed, setIsPressed] = useState<boolean>(false);
	const [pickerVisible, setPickerVisible] = useState<boolean>(false);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [validationMessageDisplay, setValidationMessageDisplay] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: any) => {
		setSelectedDate(date);
		setValidationMessageDisplay(false);
		hideDatePicker();
	};

	const navigation = useNavigation<NavigationProp<RootStackParamList, "SearchScreen">>();

	const handlePress = (): void => {
		if (passengersNumber && selectedDate && departure && arrival) {
			const formatDate = new Date(
				selectedDate.toISOString().split("T").splice(0, 1)[0],
			);
			searchJourneys({
				variables: {
					nbPassengers: passengersNumber,
					startDateTime: formatDate,
					endCity: arrival,
					startCity: departure,
				},
				onCompleted: (data) => {
					navigation.navigate("JourneysSearchResultScreen", {
						journeys: data.searchJourneys,
					});
				},
				onError: (err) => console.log(err),
			});
		} else {
			setValidationMessageDisplay(true);
		}

		setIsPressed(false);
	};

	return (
		<SafeAreaView style={styles.searchScreenContainer}>
			<View style={styles.searchScreenHeader}>
				<Text style={styles.searchScreenTitle}> Où allons-nous ? </Text>
				<Image
					source={require("../assets/car-travel.jpg")}
					style={styles.searchScreenImage}
				/>
			</View>
			<View style={styles.searchFormContainer}>
				<View style={styles.searchForm}>
					<View style={styles.searchInputContainer}>
						<Ionicons
							name="location-outline"
							size={20}
							color="black"
						/>
						<TextInput
							style={[styles.searchInputText, { height: 20 }]}
							placeholder="Départ"
							value={departure}
							onChangeText={(text) => {
								setDeparture(text);
								setValidationMessageDisplay(false);
							}}
						/>
					</View>
					<View style={styles.separatorLine} />
					<View style={styles.searchInputContainer}>
						<Ionicons
							name="flag-outline"
							size={20}
							color="black"
						/>
						<TextInput
							style={[styles.searchInputText, { height: 20 }]}
							placeholder="Arrivée"
							value={arrival}
							onChangeText={(text) => {
								setArrival(text);
								setValidationMessageDisplay(false);
							}}
						/>
					</View>
					<View style={styles.separatorLine} />
					<View style={styles.searchInputContainer}>
						<Pressable
							onPress={showDatePicker}
							style={styles.searchInputContainer}
						>
							<Ionicons
								name="calendar-outline"
								size={20}
								color="black"
							/>
							<Text
								style={[
									styles.searchInputText,
									{ color: selectedDate ? "black" : "#999" },
								]}
							>
								{selectedDate
									? selectedDate.toLocaleDateString("fr-FR")
									: "A quelle date ?"}
							</Text>
							<DateTimePickerModal
								isVisible={isDatePickerVisible}
								mode="date"
								onConfirm={handleConfirm}
								onCancel={hideDatePicker}
							/>
						</Pressable>
					</View>
					<View style={styles.separatorLine} />
					<View style={styles.searchInputContainer}>
						<Pressable
							onPress={() => setPickerVisible(true)}
							style={styles.searchInputContainer}
						>
							<Ionicons
								name="person-outline"
								size={20}
								color="black"
								onPress={() => setPickerVisible(true)}
							/>
							<Text
								style={[
									styles.searchInputText,
									{
										color: passengersNumber ? "black" : "#999",
									},
								]}
							>
								{passengersNumber ? passengersNumber : "Combien de personnes ?"}
							</Text>
							<Modal
								visible={pickerVisible}
								transparent={true}
								animationType="slide"
								onRequestClose={() => setPickerVisible(false)}
							>
								<Pressable
									style={styles.pickerModal}
									onPress={() => setPickerVisible(false)}
								>
									{[1, 2, 3, 4].map((value) => (
										<TouchableOpacity
											key={value}
											onPress={() => {
												setPassengersNumber(value);
												setValidationMessageDisplay(false);
												setPickerVisible(false);
											}}
											style={styles.modalOption}
										>
											<Text>{value}</Text>
										</TouchableOpacity>
									))}
								</Pressable>
							</Modal>
						</Pressable>
					</View>
				</View>
				<Pressable
					onPressIn={() => setIsPressed(true)}
					onPressOut={() => handlePress()}
					style={[
						sharedStyles.registerButton,
						isPressed && sharedStyles.registerButtonPressed,
						{
							marginTop: 16,
						},
					]}
				>
					<Text style={sharedStyles.registerText}>Rechercher</Text>
				</Pressable>
				{validationMessageDisplay && (
					<Text style={styles.validationMessage}>
						Veuillez compléter tous les champs avant de lancer la recherche
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	searchScreenContainer: {
		flex: 1,
		alignItems: "center",
	},
	searchScreenHeader: {
		width: "100%",
		height: "50%",
	},
	searchScreenTitle: {
		textAlign: "center",
		fontSize: 25,
		paddingVertical: 16,
	},
	searchScreenImage: {
		resizeMode: "cover",
		width: "auto",
		height: "100%",
	},
	searchFormContainer: {
		position: "absolute",
		top: "50%",
		width: "70%",
	},
	searchForm: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderWidth: 2,
		borderColor: "#d9534f",
		borderRadius: 10,
		backgroundColor: "white",
	},
	searchInputContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	searchInputText: {
		paddingLeft: 8,
		flex: 1,
	},
	separatorLine: {
		height: 1,
		backgroundColor: "grey",
		marginVertical: 8,
	},
	pickerModal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalOption: {
		backgroundColor: "#fff",
		fontSize: 24,
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 5,
		marginVertical: 5,
	},
	validationMessage: {
		color: "#d9534f",
		paddingVertical: 16,
		textAlign: "center",
	},
});

export default SearchScreen;
