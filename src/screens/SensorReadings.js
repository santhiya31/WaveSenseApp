import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function SensorReadings({ route }) {
  const { deviceName } = route.params;

  // Dummy sensor readings
  const [readings, setReadings] = useState([
    { id: "1", type: "Temperature", value: "28 °C" },
    { id: "2", type: "pH", value: "7.2" },
    { id: "3", type: "Turbidity", value: "5 NTU" },
    { id: "4", type: "Dissolved Oxygen", value: "6 mg/L" },
  ]);

  // Simulate dynamic update every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setReadings((prev) =>
        prev.map((r) =>
          r.type === "Temperature"
            ? { ...r, value: `${28 + Math.floor(Math.random() * 3)} °C` }
            : r
        )
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Readings: {deviceName}</Text>
      <FlatList
        data={readings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.readingBox}>
            <Text style={styles.readingType}>{item.type}</Text>
            <Text style={styles.readingValue}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#0077b6" },
  readingBox: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#caf0f8", borderRadius: 8, marginBottom: 10 },
  readingType: { fontWeight: "bold", color: "#03045e" },
  readingValue: { fontWeight: "bold", color: "#0077b6" },
});
