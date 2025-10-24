import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConnectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔗 WaveSense</Text>
      <Text style={styles.subtitle}>Connect to your device</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0f7fa',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00695c', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#004d40', marginBottom: 20 },
});
