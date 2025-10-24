import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorCard({ label, value, unit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value} {unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
  },
});
