import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const router = useRouter();

  // Get query parameters
  const { message, phoneNumber } = useGlobalSearchParams();

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input box automatically
    if (value && index < inputs.current.length - 1) {
      const nextInput = inputs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (!value && index > 0) {
      const previousInput = inputs.current[index - 1];
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join(""); // Combine the digits into a single string

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://farm-meet.onrender.com/register-pin-validate/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": "h3eOpzuD463toQaw4JV0JsvkRVEKXmhtBodbeHOa7jcovg1bsucFMyRzIfXaD9rQ",
          },
          body: JSON.stringify({ pin_code: otpCode }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If OTP validation is successful
        // Alert.alert("Success", "OTP verified successfully.");
        router.push("/auth/register"); // Redirect to login page
      } else {
        // Handle error response
        Alert.alert("Error", data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while verifying the OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.header}>OTP Verification</Text>
        {/* Display the message and phone number */}
        <Text style={styles.subText}>{message}</Text>
        <Text style={styles.subText}>
          We sent a code to {phoneNumber}
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === "Backspace" && handleBackspace(digit, index)
              }
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.continueButtonText}>
            {isSubmitting ? "Verifying..." : "Continue"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#013220", // Dark green
    marginBottom: 16,
  },
  subText: {
    fontSize: 14,
    color: "#7D7D7D", // Gray
    textAlign: "center",
    marginBottom: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: "#013220", // Dark green
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: "#013220", // Dark green
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  continueButtonText: {
    color: "#FFFFFF", // White
    fontSize: 16,
    fontWeight: "bold",
  },
  resendButton: {
    borderWidth: 2,
    borderColor: "#013220", // Dark green
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  resendButtonText: {
    color: "#013220", // Dark green
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OTPPage;
