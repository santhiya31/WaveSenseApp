import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";

export default function SensorReadings({ route }) {
  const { deviceName } = route.params;
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  const dummyReadings = [
    { id: "1", type: "Temperature", value: 28 },
    { id: "2", type: "pH", value: 7.2 },
    { id: "3", type: "Turbidity", value: 5 },
    { id: "4", type: "Dissolved Oxygen", value: 6 },
  ];

  const thresholds = {
    Temperature: { min: 0, max: 32 },
    pH: { min: 6.5, max: 8.5 },
    Turbidity: { min: 0, max: 10 },
    "Dissolved Oxygen": { min: 5, max: 20 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadings(dummyReadings);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Dynamic updates every 1 sec
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setReadings((prev) =>
          prev.map((r) => {
            let newValue = r.value;
            if (r.type === "Temperature") newValue = 28 + Math.floor(Math.random() * 6);
            if (r.type === "pH") newValue = +(7 + Math.random() * 2).toFixed(1);
            if (r.type === "Turbidity") newValue = 4 + Math.floor(Math.random() * 8);
            if (r.type === "Dissolved Oxygen") newValue = 4 + Math.floor(Math.random() * 4);
            return { ...r, value: newValue };
          })
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Alert check
  useEffect(() => {
    if (readings.length === 0) return;

    const abnormal = readings.find(
      (r) => r.value < thresholds[r.type].min || r.value > thresholds[r.type].max
    );

    if (abnormal) {
      setAlertMessage(`${abnormal.type} reading is abnormal: ${abnormal.value}`);
      playAlertSound();
    } else {
      setAlertMessage("");
    }
  }, [readings]);

  const playAlertSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/alert.mp3")
      );
      await sound.playAsync();

      setTimeout(async () => {
        await sound.stopAsync();
        await sound.unloadAsync();
      }, 1000);
    } catch (error) {
      console.log("Sound error:", error);
    }
  };

  // Helper function to check if value is abnormal
  const isAbnormal = (type, value) => value < thresholds[type].min || value > thresholds[type].max;

  return (
    <View style={styles.container}>
  <Text style={styles.title}>Sensor Readings: {deviceName}</Text>

  {loading ? (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0077b6" />
      <Text style={styles.loadingText}>Fetching sensor data...</Text>
    </View>
  ) : (
    <>
      {/* Wrap FlatList + alert in a centered parent */}
      <View style={styles.readingsWrapper}>
        <FlatList
          data={readings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.readingBox}>
              <Text style={styles.readingType}>{item.type}</Text>
              <Text
                style={[
                  styles.readingValue,
                  isAbnormal(item.type, item.value) && { color: "#ff4d6d", fontWeight: "bold" },
                ]}
              >
                {item.value}
              </Text>
            </View>
          )}
        />

        {alertMessage !== "" && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>⚠ {alertMessage}</Text>
          </View>
        )}
      </View>
    </>
  )}
</View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#0077b6" },
  loadingText: { fontSize: 16, color: "#555", marginTop: 10 },
  readingBox: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#caf0f8", borderRadius: 8, marginBottom: 10,width: 220 },
  readingType: { fontWeight: "bold", color: "#03045e" },
  readingValue: { fontWeight: "bold", color: "#0077b6" },
  readingsWrapper: {
  width: "100%",
  alignItems: "center", // center everything inside
},

alertBox: {
  padding: 12,
  backgroundColor: "#ff4d6d",
  borderRadius: 8,
  marginTop: 10,
  minWidth: 220,       // optional: fix width
  alignItems: "center",
  justifyContent: "center",
},

alertText: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
},

});
