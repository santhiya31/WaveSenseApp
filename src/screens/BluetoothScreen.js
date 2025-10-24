import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function BluetoothScreen({ navigation }) {
  const dummyDevices = [
    { id: "1", name: "WaveSensor-01" },
    { id: "2", name: "WaveSensor-02" },
    { id: "3", name: "TempSensor-A" },
    { id: "4", name: "TempSensor-B" },
  ];

  const handleConnect = (device) => {
    // Navigate to SensorReadings page, passing device name
    navigation.navigate("SensorReadings", { deviceName: device.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Bluetooth Devices</Text>

      <FlatList
        data={dummyDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.deviceBox}>
            <Text style={styles.deviceName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.connectBtn}
              onPress={() => handleConnect(item)}
            >
              <Text style={styles.connectText}>Connect</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#0077b6" },
  deviceBox: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "#caf0f8", borderRadius: 8, marginBottom: 10 },
  deviceName: { fontWeight: "bold", color: "#03045e" },
  connectBtn: { backgroundColor: "#0077b6", padding: 8, borderRadius: 6 },
  connectText: { color: "#fff", fontWeight: "bold" },
});
