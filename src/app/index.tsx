import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { API_URL, useAuth } from '../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';




const HomeScreen = () => {
    const { authState } = useAuth();


    useEffect(() => {
        const splashLoad = async () => await SplashScreen.hideAsync();
        
        splashLoad();
    }, [])
    
    if ( !authState?.authenticated ) {
        return <Redirect href="/login"/>
    }

    return (
        <Redirect href="/camera"/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default HomeScreen;