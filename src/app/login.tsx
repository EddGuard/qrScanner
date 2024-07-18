import { View, Image, Button, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import * as SplashScreen from 'expo-splash-screen';
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    useEffect(() => {
        const splashLoad = async () => await SplashScreen.hideAsync();
        
        splashLoad();
    }, [])

    const login = async () => {
        const result = await onLogin!(email, password);
        if(result && result.error) {
            alert(result.msg);
        }
    };

    return (
        <View style={{paddingTop: insets.top, alignItems: 'center', width: '100%'}}>
            <Image source={require('./bootsplash.png')} style={styles.image}/>
            <View style={{gap:10, width: '60%'}}>
                <TextInput placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} style={styles.input}/>
                <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password} style={styles.input}/>
                <Button onPress={login} title='Sign in'/>
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

export default Login;