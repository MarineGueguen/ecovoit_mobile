import { View, Text, TextInput } from "react-native";
import React from "react";
import { InputProps } from "../../interfaces/form";
import { styles } from "../../assets/styles";

const CustomTextInput: React.FC<InputProps> = ({
    label,
    onChangeText,
    icon,
    value,
    IsSecureText,
    keyboardType,
    placeholder,
    textContentType,
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <View style={styles.input}>
        {icon && (
          <View style={styles.inputIcon}>
            {icon}
          </View>
        )}
        <TextInput style={styles.inputText}
          onChangeText={onChangeText} secureTextEntry={IsSecureText} keyboardType={keyboardType} placeholder={placeholder}
          placeholderTextColor={"grey"} returnKeyType={"done"} textContentType={textContentType} autoCapitalize='none' value={value}
        />
      </View>
    </View>
  );
};

export default CustomTextInput;
