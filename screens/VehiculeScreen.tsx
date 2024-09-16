import React from "react";
import { Text, View, Button, TouchableOpacity } from 'react-native';

const VehiculeScreen = (props :any) => {
    return(
        <View> 
            <TouchableOpacity onPress={ () => props.navigation.navigate("ProfileScreen")}>
            <Text>Mon Profil</Text>
            </TouchableOpacity>
        </View>
    );
}

export default VehiculeScreen;
