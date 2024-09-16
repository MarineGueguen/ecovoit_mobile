import React, { useState } from "react";
import { Modal, Pressable, View, TextInput, Text, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { styles } from "../assets/styles";
import { Ionicons } from "@expo/vector-icons";
import { createJourneyInput } from "../interfaces/journey";
import { ADD_JOURNEY } from "../constants/journeys";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<
    RootStackParamList,
    "CommentScreen"
>;

const CommentScreen = ({ navigation, route } : Props) => {
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createJourneyMutation] = useMutation(ADD_JOURNEY)

  const journeyInput = route.params?.journey as createJourneyInput;

  const handlePublishPress = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      setComment("");
      navigation.navigate('ResultsScreen');
    }, 2000);
  };

  const createPress = () => {
    const startDate = journeyInput.selectedDate?.toISOString().split( "T" );
    const startTime = journeyInput.selectedTime?.toISOString().split("T");
    if(startDate && startTime) {
      const finalDate = `${startDate[0]} ${startTime[1]}`;
      createJourneyMutation(
        {
          variables: {
            "createJourneyInput": {
              "start_date_time": finalDate,
              "is_instant_bookable": journeyInput.isInstantBookable,
              "is_smoking_allowed": journeyInput.isSmoker,
              "is_talkative": journeyInput.isTalkative,
              "is_music_lover": journeyInput.isMusicLover,
              "seats_available": journeyInput.passengers,
              "carId": journeyInput.carId,
              "comment": comment,
              "startPoint": {
                "city": journeyInput.departure,
              },
              "endPoint": {
                "city": journeyInput.arrival,
              },
            },
          },
          onCompleted: (data) => {
            console.log(data)
          },
          onError: (err) => {
            if(err.graphQLErrors) {
              err.graphQLErrors.map((error) => console.log(error))
            }
            if(err.networkError) {
              console.log(err.networkError);
            }
          }
        }
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Votre trajet a été publié!</Text>
            </View>
          </View>
        </Modal>
        <Text style={styles.TextInputAdd}>
          Un commentaire sur votre trajet?
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
          style={styles.textArea}
        />
        <Pressable style={styles.loginButton} onPress={() => {
          createPress();
          handlePublishPress();
        }}>
          <Text style={styles.loginText}>Publier le trajet</Text>
        </Pressable>
        <Ionicons
          name="arrow-back"
          type="font-awesome"
          style={styles.bottomLeftIcon}
          onPress={() =>
            navigation.navigate("OptionsScreen", {
              journey: {
                ...journeyInput,
                comment,
              },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default CommentScreen;
