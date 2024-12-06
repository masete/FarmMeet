// import React, { useState } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   FlatList,
//   Modal,
//   Pressable,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Ionicons } from '@expo/vector-icons'; // For user icon
// import { router } from 'expo-router';
// import axios from 'axios';

// export default function ProfilePage() {
//   const [farmName, setFarmName] = useState('');
//   const [farmDescription, setFarmDescription] = useState('');
//   const [farmCategory, setFarmCategory] = useState<string[]>([]);
//   const [farmAddress, setFarmAddress] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [profilePicture, setProfilePicture] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const categories = [
//     'Fruits and Vegetables',
//     'Meat and Seafood',
//     'Dairy and Eggs',
//     'Root and Tubers',
//   ];

//   const toggleCategory = (category: string) => {
//     setFarmCategory((prev) =>
//       prev.includes(category)
//         ? prev.filter((item) => item !== category)
//         : [...prev, category]
//     );
//   };

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setProfilePicture(result.assets[0].uri);
//     }
//   };

//   const handleSaveProfile = async () => {
//     if (
//       !farmName ||
//       !farmDescription ||
//       !farmCategory.length ||
//       !farmAddress ||
//       !fullName ||
//       !email ||
//       !phoneNumber
//     ) {
//       Alert.alert('Error', 'Please fill out all fields.');
//       return;
//     }

//     try {
//       const formData = new FormData();

//       // Append form data fields
//       formData.append('farm_name', farmName);
//       formData.append('description', farmDescription);
//       formData.append('farm_category', farmCategory.join(', '));
//       formData.append('farm_address', farmAddress);
//       formData.append('email', email);
//       formData.append('farm_size', 'large'); // Example: Add farm size if required
//       formData.append('max_orders', '56'); // Example: Add max orders if required
//       formData.append('delivery_days', 'monday'); // Example: Add delivery days if required

//       // Append profile picture if available
//       if (profilePicture) {
//         const uriParts = profilePicture.split('.');
//         const fileType = uriParts[uriParts.length - 1];
//         formData.append('farmer_image', {
//           uri: profilePicture,
//           name: `profile.${fileType}`,
//           type: `image/${fileType}`,
//         } as any);
//       }

//       // Make API call
//       const response = await axios.post(
//         'https://farm-meet.onrender.com/farmer/farmer-profiles/',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'X-CSRFToken': 'h3eOpzuD463toQaw4JV0JsvkRVEKXmhtBodbeHOa7jcovg1bsucFMyRzIfXaD9rQ', // Add CSRF token if required
//           },
//         }
//       );

//       Alert.alert('Success', 'Profile saved successfully!');
//       console.log('API Response:', response.data);

//       // Navigate to the next page
//       router.push('/farmOperations');
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Alert.alert('Error', 'An error occurred while saving the profile.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Farmer's Profile</Text>

//       {/* Profile Picture */}
//       <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
//         {profilePicture ? (
//           <Image source={{ uri: profilePicture }} style={styles.profileImage} />
//         ) : (
//           <Ionicons name="person-circle-outline" size={100} color="#042D1F" />
//         )}
//       </TouchableOpacity>

//       {/* Farm Name */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Farm Name"
//         value={farmName}
//         onChangeText={setFarmName}
//       />

//       {/* Farm Description */}
//       <TextInput
//         style={styles.input}
//         placeholder="Tell us about your farm"
//         value={farmDescription}
//         onChangeText={setFarmDescription}
//         multiline
//       />

//       {/* Farm Category Dropdown */}
//       <TouchableOpacity
//         style={styles.input}
//         onPress={() => setModalVisible(true)}
//       >
//         <Text style={styles.text}>
//           {farmCategory.length
//             ? farmCategory.join(', ')
//             : 'Select Farm Categories'}
//         </Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Categories</Text>
//             <FlatList
//               data={categories}
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => toggleCategory(item)}
//                   style={styles.checkboxContainer}
//                 >
//                   <Ionicons
//                     name={
//                       farmCategory.includes(item) ? 'checkbox' : 'square-outline'
//                     }
//                     size={24}
//                     color="#042D1F"
//                   />
//                   <Text style={styles.checkboxLabel}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <Pressable
//               style={styles.saveButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.saveButtonText}>Done</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>

//       {/* Other Inputs */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Farm Address"
//         value={farmAddress}
//         onChangeText={setFarmAddress}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Full Name"
//         value={fullName}
//         onChangeText={setFullName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Email Address"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Phone Number"
//         keyboardType="phone-pad"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//       />

//       {/* Save Button */}
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
//         <Text style={styles.saveButtonText}>Save And Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Styles remain unchanged

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   imagePicker: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileImage: {
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   text: {
//     fontSize: 16,
//     color: '#555',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   saveButton: {
//     backgroundColor: '#042D1F',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ApiResponse {
  success: boolean;
  message: string;
  data: any; // Adjust this based on the actual response data structure
}

export default function ProfilePage() {
  const [farmName, setFarmName] = useState('');
  const [farmDescription, setFarmDescription] = useState('');
  const [farmCategory, setFarmCategory] = useState<string[]>([]);
  const [farmAddress, setFarmAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const categories = [
    'Fruits and Vegetables',
    'Meat and Seafood',
    'Dairy and Eggs',
    'Root and Tubers',
  ];

  useEffect(() => {
    const fetchTokens = async () => {
      const access = await SecureStore.getItemAsync('accessToken');
      const refresh = await SecureStore.getItemAsync('refreshToken');
      if (!access || !refresh) {
        Alert.alert('Error', 'You must be logged in to access this page.');
        router.push('/login');
      } else {
        setAccessToken(access);
        setRefreshToken(refresh);
      }
    };
    fetchTokens();
  }, []);

  const toggleCategory = (category: string) => {
    setFarmCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('https://farm-meet.onrender.com/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'h3eOpzuD463toQaw4JV0JsvkRVEKXmhtBodbeHOa7jcovg1bsucFMyRzIfXaD9rQ',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      const data: ApiResponse = await response.json();
      if (data.success) {
        const newAccessToken = data.data.access;
        await SecureStore.setItemAsync('accessToken', newAccessToken);
        setAccessToken(newAccessToken);
        return newAccessToken;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      Alert.alert('Error', 'Session expired. Please log in again.');
      router.push('/login');
    }
  };

  const makeAuthenticatedRequest = async (
    url: string,
    method: string,
    data: any = null
  ) => {
    try {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: data ? data : undefined,
      });

      const responseData: ApiResponse = await response.json();
      return responseData;
    } catch (error) {
      if (error instanceof Error && error.message === 'Failed to fetch') {
        // Retry on token expiry
        const newToken = await refreshAccessToken();
        if (newToken) {
          const retryResponse = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${newToken}`,
              'Content-Type': 'multipart/form-data',
            },
            body: data ? data : undefined,
          });

          const retryData: ApiResponse = await retryResponse.json();
          return retryData;
        }
      }
      throw error;
    }
  };

  const handleSaveProfile = async () => {
    if (
      !farmName ||
      !farmDescription ||
      !farmCategory.length ||
      !farmAddress ||
      !fullName ||
      !email ||
      !phoneNumber
    ) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('farm_name', farmName);
      formData.append('description', farmDescription);
      formData.append('farm_category', farmCategory.join(', '));
      formData.append('farm_address', farmAddress);
      formData.append('email', email);
      formData.append('farm_size', 'large');
      formData.append('max_orders', '56');
      formData.append('delivery_days', 'monday');

      if (profilePicture) {
        const uriParts = profilePicture.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('farmer_image', {
          uri: profilePicture,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }

      const responseData = await makeAuthenticatedRequest(
        'https://farm-meet.onrender.com/farmer/farmer-profiles/',
        'POST',
        formData
      );

      if (responseData.success) {
        Alert.alert('Success', 'Profile saved successfully!');
        console.log('API Response:', responseData);
        router.push('/farmOperations');
      } else {
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'An error occurred while saving the profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Farmer's Profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={100} color="#042D1F" />
        )}
      </TouchableOpacity>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Enter Farm Name"
        value={farmName}
        onChangeText={setFarmName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tell us about your farm"
        value={farmDescription}
        onChangeText={setFarmDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>
          {farmCategory.length
            ? farmCategory.join(', ')
            : 'Select Farm Categories'}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Modal Content */}
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Enter Farm Address"
        value={farmAddress}
        onChangeText={setFarmAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.saveButtonText}>Save And Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#042D1F',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  text: {
    color: '#042D1F',
  },
  saveButton: {
    backgroundColor: '#042D1F',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
