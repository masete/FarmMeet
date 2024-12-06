import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router, useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter your phone number and password.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('https://farm-meet.onrender.com/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save tokens securely
        await SecureStore.setItemAsync('accessToken', data.access);
        await SecureStore.setItemAsync('refreshToken', data.refresh);
  
        Alert.alert('Success', 'You are now signed in.');
        router.push('/auth/success'); // Navigate to the next screen
      } else {
        Alert.alert('Error', data.detail || 'Invalid credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  // const handleSignIn = async () => {
  //   if (!phoneNumber || !password) {
  //     Alert.alert('Error', 'Please enter your phone number and password.');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch('https://farm-meet.onrender.com/login/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'accept': 'application/json',
  //         'X-CSRF-TOKEN': 'h3eOpzuD463toQaw4JV0JsvkRVEKXmhtBodbeHOa7jcovg1bsucFMyRzIfXaD9rQ', // Ensure this token is valid
  //       },
  //       body: JSON.stringify({
  //         phone_number: phoneNumber,
  //         password: password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Redirect to the profile setup page
  //       router.push('/auth/success');
  //     } else {
  //       // Show error message from the backend or a generic one
  //       Alert.alert('Error', data.detail || 'Phone number or password is incorrect.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Something went wrong. Please try again later.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Sign In</Text>

      {/* Phone Number Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Phone Number" 
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Password Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => router.push('/auth/forgot_password')} >
        <Text style={styles.forgotPasswordInText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity 
        style={styles.signInButton} 
        onPress={handleSignIn}
        disabled={loading}
      >
        <Text style={styles.signInButtonText}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Redirect */}
      <View>
        <TouchableOpacity onPress={() => router.push('/auth/register')} >
          <Text style={styles.signInText}>
            New Here? Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#042D1F',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#042D1F',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
  },
  forgotPasswordInText: {
    fontSize: 16,
    marginLeft: 16,
    textAlign: 'right',
    marginTop: 16,
    marginBottom:16,
    color: 'gray',
  }
});
