import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function GreenScreen () {
  const router = useRouter();

    // Navigate to the next screen after 3 seconds
    useEffect(() => {
      const timeout = setTimeout(() => {
        router.push('/splash-1');
      }, 1000);

      // Cleanup the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }, [router]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/splash-1')}>
        <Text style={styles.whiteText}>FarmMeet</Text>
      </TouchableOpacity>
      
    </View>
  );
};

// export default GreenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#013220',
  },
  whiteText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
