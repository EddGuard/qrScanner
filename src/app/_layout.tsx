import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Slot } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { authState, onLogout } = useAuth();
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </SafeAreaProvider>
  )
}