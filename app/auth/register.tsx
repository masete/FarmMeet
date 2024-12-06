// import React, { useState } from 'react';
// import { useRouter } from 'expo-router';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// export default function Register() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');

//   const router = useRouter();

//   const handleSignUp = async () => {
//     if (!fullName || !phoneNumber || !password || !selectedRole) {
//       Alert.alert('Error', 'Please fill out all fields.');
//       return;
//     }

//     setIsSubmitting(true);

//     const user = {
//       full_name: fullName,
//       role: selectedRole.toLowerCase(),
//       phone_number: phoneNumber,
//       password: password,
//     };

//     try {
//       const response = await fetch(
//         'https://farm-meet.onrender.com/register-generate-pin/',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//           body: JSON.stringify(user),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Registration response:', data);

//         // Navigate to OTP verification page and pass response data
//         router.push({
//           pathname: '/auth/otp',
//           params: { phoneNumber: user.phone_number, message: data.message },
//         });
//       } else {
//         const errorData = await response.json();
//         Alert.alert('Error', errorData.message || 'Registration failed');
//         console.error('Error response:', errorData);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong. Please try again later.');
//       console.error('Error:', error);
//     }finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* FarmMeet Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>FarmMeet</Text>
//       </View>

//       {/* Signup Form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.signupText}>Sign Up</Text>

//         {/* Radio Buttons for Role */}
//         <View style={styles.radioContainer}>
//           <TouchableOpacity
//             style={[
//               styles.radioButton,
//               selectedRole === 'Farmer' && styles.radioSelected,
//             ]}
//             onPress={() => setSelectedRole('Farmer')}
//           >
//             <Text style={styles.radioText}>Farmer</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.radioButton,
//               selectedRole === 'Consumer' && styles.radioSelected,
//             ]}
//             onPress={() => setSelectedRole('Consumer')}
//           >
//             <Text style={styles.radioText}>Consumer</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Input Fields */}
//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           value={fullName}
//           onChangeText={setFullName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone Number"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         {/* Terms and Conditions */}
//         <View style={styles.termsContainer}>
//           <Text style={styles.termsText}>
//             Agree with Terms & Conditions and Privacy Policy
//           </Text>
//         </View>

//         {/* Signup Button */}
//         <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
//           <Text style={styles.signupButtonText}>Sign Up</Text>
//         </TouchableOpacity>

//         {/* Sign In Redirect */}
//         <TouchableOpacity onPress={() => router.push('/auth/login')}>
//           <Text style={styles.signInText}>
//             Already have an account? Sign In
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   header: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     color: 'black',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   formContainer: {
//     flex: 8,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 20,
//   },
//   signupText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   radioButton: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   radioSelected: {
//     backgroundColor: '#e0f7e4',
//     borderColor: 'green',
//   },
//   radioText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: 'black',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 15,
//     color: 'black',
//   },
//   termsContainer: {
//     marginBottom: 15,
//   },
//   termsText: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: 'black',
//   },
//   signupButton: {
//     backgroundColor: '#042D1F',
//     borderRadius: 10,
//     paddingVertical: 25,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   signupButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   signInText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'blue',
//   },
// });

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons for the eye icon

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  const router = useRouter();

  const handleSignUp = async () => {
    if (!fullName || !phoneNumber || !password || !selectedRole) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    setIsSubmitting(true);

    const user = {
      full_name: fullName,
      role: selectedRole.toLowerCase(),
      phone_number: phoneNumber,
      password: password,
    };

    try {
      const response = await fetch(
        'https://farm-meet.onrender.com/register-generate-pin/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Registration response:', data);

        // Navigate to OTP verification page and pass response data
        router.push({
          pathname: '/auth/otp',
          params: { phoneNumber: user.phone_number, message: data.message },
        });
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Registration failed');
        console.error('Error response:', errorData);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* FarmMeet Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FarmMeet</Text>
      </View>

      {/* Signup Form */}
      <View style={styles.formContainer}>
        <Text style={styles.signupText}>Sign Up</Text>

        {/* Radio Buttons for Role */}
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedRole === 'Farmer' && styles.radioSelected,
            ]}
            onPress={() => setSelectedRole('Farmer')}
          >
            <Text style={styles.radioText}>Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedRole === 'Consumer' && styles.radioSelected,
            ]}
            onPress={() => setSelectedRole('Consumer')}
          >
            <Text style={styles.radioText}>Consumer</Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Agree with Terms & Conditions and Privacy Policy
          </Text>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp}
          disabled={isSubmitting}
        >
          <Text style={styles.signupButtonText}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        {/* Sign In Redirect */}
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 8,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  radioSelected: {
    backgroundColor: '#e0f7e4',
    borderColor: 'green',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    color: 'black',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  termsContainer: {
    marginBottom: 15,
  },
  termsText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
  signupButton: {
    backgroundColor: '#042D1F',
    borderRadius: 10,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
  },
});
