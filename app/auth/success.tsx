import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { router } from 'expo-router';

// Define the types for your navigation routes
type RootStackParamList = {
  SuccessPage: undefined; // Correctly using 'SuccessPage'
  SetupProfile: undefined;
  Dashboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'SuccessPage'>;

export default function SuccessPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome To FarmMeet</Text>

      {/* Subheading */}
      <Text style={styles.infoText}>
        Your information has been saved. Let’s get you started on your farm-to-table journey!
      </Text>

      {/* Buttons */}
      <TouchableOpacity 
        style={styles.setupButton} 
        onPress={() => router.push('/profile/setUpProfile')}
      >
        <Text style={styles.setupButtonText}>Set Up Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => router.push('/dashboard/dashboard')}
        // onPress={() => navigation.navigate('/dashboard/dashboard')}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#042D1F', // Dark green
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#042D1F', // Dark green
    textAlign: 'center',
    marginBottom: 40,
  },
  setupButton: {
    backgroundColor: '#042D1F', // Dark green
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 15,
  },
  setupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#042D1F', // Dark green border
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  skipButtonText: {
    color: '#042D1F', // Dark green text
    fontSize: 16,
    textAlign: 'center',
  },
});
