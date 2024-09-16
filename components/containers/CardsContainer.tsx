import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { Entypo, Feather, SimpleLineIcons } from "@expo/vector-icons";
import { JourneyCardInformations } from "../../interfaces/journey";
import { styles as sharedStyles } from "../../assets/styles";
import { SafeAreaView } from "react-native-safe-area-context";

type CardContainerProps = {
  item: JourneyCardInformations;
  navigation: any;
};

const CardsContainer = ({ item, navigation }: CardContainerProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                }
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
                      (new Date(item.start_date_time) as any)
                  )
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
        </View>

        <View
          style={[
            styles.pointContainer,
            { justifyContent: "space-evenly", marginTop: 16 },
          ]}
        >
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 40,
    marginRight: 40,
    borderWidth: 3,
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
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 100,
  },
  textBtn: {
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CardsContainer;
