import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../assets/styles";
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<
    RootStackParamList,
    "PublishScreen"
>;

const PublishScreen = ({ navigation }: Props) => {
  const [departure, setDeparture] = useState<string>("");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.textTilteCreate}>Publier mon trajet</Text>
      <View style={styles.container}>
        <Text style={styles.TextInputAdd}>D'où partez-vous?</Text>
        <TextInput
          onChangeText={(text) => setDeparture(text)}
          style={styles.publishInput}
          placeholder="Saissisez l'adresse"
        />
        <Ionicons
          name='arrow-forward'
          type='font-awesome'
          onPress={() => navigation.navigate('EndScreen', { journey: { departure }})}
          style={styles.bottomRightIcon}
        />
      </View>
    </SafeAreaView>
  );
};

export default PublishScreen;
