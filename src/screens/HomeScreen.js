import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SensorCard from '../components/SensorCard';

export default function HomeScreen() {
  const [temperature, setTemperature] = useState(27.5);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => (prev + (Math.random() * 0.5 - 0.25)).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌊 WaveSense Dashboard</Text>
      <SensorCard label="Temperature" value={temperature} unit="°C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0fdfa' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20, color: '#00695c' },
});
