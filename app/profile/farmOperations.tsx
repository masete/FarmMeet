import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the arrow icon
import { router } from 'expo-router';

export default function FarmOperationsPage() {
  const [farmSize, setFarmSize] = useState<string[]>([]);
  const [maxOrders, setMaxOrders] = useState('');
  const [deliveryDays, setDeliveryDays] = useState<string[]>([]);
  const [farmSizeModalVisible, setFarmSizeModalVisible] = useState(false);
  const [deliveryDaysModalVisible, setDeliveryDaysModalVisible] = useState(false);

  const farmSizeOptions = ['Small', 'Medium', 'Large', 'Enterprise'];
  const deliveryDaysOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const toggleSelection = (item: string, setSelected: React.Dispatch<React.SetStateAction<string[]>>, selected: string[]) => {
    setSelected(selected.includes(item) ? selected.filter((i) => i !== item) : [...selected, item]);
  };

  const handleSaveAndContinue = () => {
    if (!farmSize.length || !maxOrders || !deliveryDays.length) {
      alert('Please fill out all fields.');
      return;
    }
  
    // Save details successfully
    alert('Details saved successfully!');
    console.log('Farm Operations:', { farmSize, maxOrders, deliveryDays });
  
    // Redirect to the next page
    router.push('/profile/farmProduce');
  };
  

  return (
    <View style={styles.container}>
      {/* Title with Arrow */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#042D1F" onPress={() => router.push('/setUpProfile')} />
        <Text style={styles.title}>Farm Operations</Text>
      </View>

      {/* Farm Size Dropdown */}
      <TouchableOpacity style={styles.input} onPress={() => setFarmSizeModalVisible(true)}>
        <Text style={styles.text}>
          {farmSize.length ? farmSize.join(', ') : 'Select Farm Size'}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={farmSizeModalVisible}
        onRequestClose={() => setFarmSizeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Farm Size</Text>
            <FlatList
              data={farmSizeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleSelection(item, setFarmSize, farmSize)}
                  style={styles.checkboxContainer}
                >
                  <Ionicons
                    name={farmSize.includes(item) ? 'checkbox' : 'square-outline'}
                    size={24}
                    color="#042D1F"
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable
              style={styles.saveButton}
              onPress={() => setFarmSizeModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Maximum Orders */}
      <TextInput
        style={styles.input}
        placeholder="Enter Maximum Orders"
        keyboardType="numeric"
        value={maxOrders}
        onChangeText={setMaxOrders}
      />

      {/* Delivery Days Dropdown */}
      <TouchableOpacity style={styles.input} onPress={() => setDeliveryDaysModalVisible(true)}>
        <Text style={styles.text}>
          {deliveryDays.length ? deliveryDays.join(', ') : 'Select Delivery Days'}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={deliveryDaysModalVisible}
        onRequestClose={() => setDeliveryDaysModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Delivery Days</Text>
            <FlatList
              data={deliveryDaysOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleSelection(item, setDeliveryDays, deliveryDays)}
                  style={styles.checkboxContainer}
                >
                  <Ionicons
                    name={deliveryDays.includes(item) ? 'checkbox' : 'square-outline'}
                    size={24}
                    color="#042D1F"
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable
              style={styles.saveButton}
              onPress={() => setDeliveryDaysModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Save and Continue Button */}
      <TouchableOpacity style={styles.saveButton} 
    //   onPress={handleSaveAndContinue}
      onPress={() => router.push('/profile/farmProduce')}>
        <Text style={styles.saveButtonText}>Save And Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#042D1F',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#042D1F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


