import React from "react";
import { Text, View, Button, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/styles";

const ProfileScreen = ({ navigation, onUserLogout }:any) => {
    return(
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={ () => navigation.navigate("VehiculeScreen")}>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUserLogout}>
            <Text style={styles.logOut}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };


export default ProfileScreen;