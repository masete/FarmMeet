import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const ForgotPasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleResetPassword = () => {
    // Add your reset password logic here
    alert(`Instructions sent to ${phoneNumber}`);
    // navigation.navigate("OTP");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password?</Text>
      <Text style={styles.subText}>
        Don't worry, we will send you instructions
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#013220", // Dark green
    textAlign: "center",
    marginBottom: 60,
  },
  subText: {
    fontSize: 14,
    color: "#7D7D7D", // Grey
    textAlign: "center",
    marginBottom: 60,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#013220", // Dark green
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // White
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
