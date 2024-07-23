import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useAuth } from '../context/AuthContext';
import { CameraView, Camera } from "expo-camera";
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [hasPermission, setHasPermission]: [hasPermission:any, setHasPermission:any] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { onLogout } = useAuth();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    const splashLoad = async () => await SplashScreen.hideAsync();
        
    splashLoad();
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: {type:any, data:any}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const logout = async () => {
    const result = await onLogout!();

    if(result && result.error) {
        alert(result.msg);
    }

    return router.navigate({pathname:"/login",params:{}});
};

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={styles.container}
      />
      <Button title={"Logout"} onPress={logout}/>
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});