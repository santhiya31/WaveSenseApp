
import { BleManager } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';

export const manager = new BleManager();


export async function requestPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'WaveSense Bluetooth Permission',
        message: 'App needs location access to scan for BLE devices',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

// Scan BLE devices
export function scanDevices(callback) {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.warn(error);
      return;
    }
    if (device && device.name) callback(device);
  });
}

// Stop scanning
export function stopScan() {
  manager.stopDeviceScan();
}

// Connect to a device
export async function connectToDevice(deviceId) {
  try {
    const device = await manager.connectToDevice(deviceId);
    await device.discoverAllServicesAndCharacteristics();
    return device;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Subscribe to characteristic (real-time updates)
export function subscribeToCharacteristic(device, serviceUUID, characteristicUUID, callback) {
  return device.monitorCharacteristicForService(
    serviceUUID,
    characteristicUUID,
    (error, characteristic) => {
      if (error) {
        console.error(error);
        return;
      }
      const value = Buffer.from(characteristic.value, 'base64').readFloatLE(0);
      callback(value.toFixed(2));
    }
  );
}
