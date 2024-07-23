import { View, Image, Button, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import * as SplashScreen from 'expo-splash-screen';
import { API_URL, useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';
import { IconButton } from 'react-native-paper';

const Home = () => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister, authState } = useAuth();


    useEffect(() => {
        const splashLoad = async () => await SplashScreen.hideAsync();
        
        splashLoad();
    }, [])

    const camera = async () => {
        return (<Redirect href={"/camera"}/>);
    };

    return (
        <View style={{paddingTop: insets.top, alignItems: 'center', width: '100%'}}>
            <Image source={require('./bootsplash.png')} style={styles.image}/>
            <View style={{gap:10, width: '60%'}}>
                
                <IconButton onPress={camera} icon={"barcode"}/>
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    input: {
        height: 44, 
        borderWidth: 1, 
        borderRadius: 4,
        backgroundColor: 'gray',
        color: 'white'
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});

export default Home;