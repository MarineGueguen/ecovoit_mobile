import React from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
	Pressable,
} from "react-native";
import { SimpleLineIcons, Entypo, Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { styles as sharedStyles } from "../assets/styles";
import { IJourney } from "../interfaces/journey";

type Props = NativeStackScreenProps<
	RootStackParamList,
	"JourneysSearchResultScreen"
>;

const JourneysSearchResultScreen = ({ route, navigation }: Props) => {
	const journeys: IJourney[] = route.params.journeys;

	return journeys.length > 0 ? (
		<FlatList
			data={journeys}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<View style={styles.cardContainer}>
					<View>
						<View style={styles.pointContainer}>
							<Text style={[styles.travelPointItem, sharedStyles.textXl]}>
								{item.start_point.city}
							</Text>
							<View style={styles.travelBar} />
							<Text style={[styles.travelPointItem, sharedStyles.textXl]}>
								{item.end_point.city}
							</Text>
						</View>

						<View style={styles.pointContainer}>
							<Text style={[styles.travelPointItem, sharedStyles.textLg]}>
								{new Date(item.start_date_time.toString()).toLocaleTimeString(
									"fr-FR",
									{
										hour: "numeric",
										minute: "numeric",
									},
								)}
							</Text>
							<View style={[styles.travelBar, styles.plainTravelBar]}>
								<View style={[styles.travelDot, { left: 0 }]} />
								<View style={[styles.travelDot, { right: 0 }]} />
							</View>
							<Text style={[styles.travelPointItem, sharedStyles.textLg]}>
								{item.duration
									? new Date(item.duration).toLocaleTimeString("fr-FR", {
											hour: "numeric",
											minute: "numeric",
									  })
									: "Inconnu"}
							</Text>
						</View>
						<Text style={styles.travelPointItem}>
							{item.duration
								? new Date(
										Math.abs(
											(new Date(item.duration) as any) -
												(new Date(item.start_date_time) as any),
										),
								  ).toLocaleTimeString("fr-FR", {
										hour: "numeric",
										minute: "numeric",
								  })
								: "Inconnu"}
						</Text>
					</View>

					<View
						style={[
							styles.pointContainer,
							{ justifyContent: "space-evenly", marginTop: 16 },
						]}
					>
						<View style={{ alignItems: "center" }}>
							<Image
								style={styles.avatar}
								source={{
									uri:
										item.car.owner.photo ??
										"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
								}}
							/>
							<Text>{item.car.owner.first_name}</Text>
						</View>
						{item.is_instant_bookable && (
							<SimpleLineIcons
								name="book-open"
								size={24}
								color="black"
							/>
						)}
					</View>

					<View
						style={[
							styles.pointContainer,
							{ justifyContent: "space-evenly", marginTop: 16 },
						]}
					>
						<Pressable
							onPress={() =>
								navigation.navigate("JourneyScreen", {
									id: +item.id,
								})
							}
						>
							{({ pressed }) => (
								<Text
									style={[
										sharedStyles.textLg,
										styles.textBtn,
										styles.pressableBtn,
										{
											color: pressed ? "#fff" : "#77B190",
											backgroundColor: pressed ? "#77B190" : "#fff",
										},
									]}
								>
									Voir plus{" "}
									<Entypo
										name="plus"
										size={20}
										color={pressed ? "#fff" : "#77B190"}
									/>
								</Text>
							)}
						</Pressable>
						<Pressable onPress={() => console.log("booking fonctionnality")}>
							{({ pressed }) => (
								<Text
									style={[
										sharedStyles.textLg,
										styles.textBtn,
										styles.pressableBtn,
										{
											color: pressed ? "#fff" : "rgb(245, 172, 91)",
											backgroundColor: pressed ? "rgb(245, 172, 91)" : "#fff",
										},
									]}
								>
									Réserver{" "}
									<Feather
										name="arrow-right"
										size={20}
										color={pressed ? "#fff" : "rgb(245, 172, 91)"}
									/>
								</Text>
							)}
						</Pressable>
					</View>
				</View>
			)}
		/>
	) : (
		<Text>Aucun trajet ne correspond à votre recherche</Text>
	);
};

export default JourneysSearchResultScreen;

const styles = StyleSheet.create({
	cardContainer: {
		margin: 8,
		padding: 8,
		borderWidth: 2,
		borderColor: "rgb(159, 206, 180)",
		borderRadius: 20,
		backgroundColor: "#fff",
	},
	pointContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	travelPointItem: {
		flex: 1,
		textAlign: "center",
	},
	travelBar: {
		width: 64,
	},
	plainTravelBar: {
		height: 4,
		backgroundColor: "rgb(245, 172, 91)",
		position: "relative",
	},
	travelDot: {
		position: "absolute",
		bottom: "50%",
		transform: [{ translateY: 4 }],
		height: 8,
		width: 8,
		borderRadius: 1000,
		borderWidth: 2,
		borderColor: "rgb(245, 172, 91)",
		backgroundColor: "#fff",
	},
	avatar: {
		height: 32,
		width: 32,
		borderRadius: 1000,
		borderWidth: 2,
		borderColor: "rgb(245, 172, 91)",
	},
	pressableBtn: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	textBtn: {
		color: "#fff",
		fontWeight: "500",
	},
});