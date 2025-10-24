import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌊 WaveSense</Text>
      <Text style={styles.subtitle}>Monitor Water Parameters Instantly</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Bluetooth')}
      >
        <Text style={styles.buttonText}>Connect via Bluetooth</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6f7ff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0077b6' },
  subtitle: { fontSize: 16, marginVertical: 20, color: '#023e8a' },
  button: { backgroundColor: '#0096c7', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
