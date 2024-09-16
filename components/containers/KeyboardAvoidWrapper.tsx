import React from "react";
import { KeyboardAvoidingView, Keyboard, Pressable, ScrollView } from "react-native";
import { IProps } from "../../interfaces/container";
import { styles } from "../../assets/styles";

// automatically adjust either height, position, or bottom padding based on the keyboard height
const KeyboardAvoidingWrapper: React.FC<IProps> = ({ children }) => {
    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingWrapper}
            keyboardVerticalOffset={60}
        >
            <ScrollView style={styles.keyboardAvoidingWrapper} showsVerticalScrollIndicator={false}>
                <Pressable onPress={Keyboard.dismiss}>{ children }</Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingWrapper;
