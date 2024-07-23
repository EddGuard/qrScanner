import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';




const HomeScreen = () => {
    const { authState } = useAuth();

    useEffect(() => {
        const splashLoad = async () => await SplashScreen.hideAsync();

        splashLoad();
    }, [])
    
    if ( !authState?.authenticated ) {
        return <Redirect href="/login"/>
    }

    return <Redirect href="/camera"/>
    
}

export default HomeScreen;